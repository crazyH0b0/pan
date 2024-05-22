import React from 'react';
import Bar from './bar';
import { ScrollArea } from '@/components/ui/scroll-area';
import prisma from '@/lib/prisma';
import { subDays, startOfDay, endOfDay, addDays, format } from 'date-fns';

import Line from './line';
import Example from './progress';
import { getCookieCredential } from '@/utils/getCookieCredential ';
import bytes from 'bytes';

const ChartsPage = async () => {
  const user = await getCookieCredential();
  // 条形图
  const fileTypeCounts = await prisma.file.groupBy({
    by: ['type'],
    _count: {
      type: true,
    },
    where: {
      type: {
        not: 'folder',
      },
      pan: {
        userId: user.id,
      },
    },
    orderBy: {
      _count: {
        type: 'desc',
      },
    },
  });
  const barChartData = fileTypeCounts.map((item) => ({
    category: item.type,
    count: item._count.type,
  }));

  // 折线图
  // 获取当前日期和一周前的日期
  const today = new Date();
  const oneWeekAgo = subDays(today, 7);

  // 创建一个数组来存储每天的上传次数
  const uploadFrequencyData = [];

  // 对过去一周的每一天进行循环处理
  for (let day = oneWeekAgo; day <= today; day = addDays(day, 1)) {
    const startOfTheDay = startOfDay(day);
    const endOfTheDay = endOfDay(day);

    // 执行 Prisma 查询
    const dailyUploads = await prisma.file.count({
      where: {
        createdAt: {
          gte: startOfTheDay,
          lt: endOfTheDay,
        },
        type: {
          not: 'folder', // 假设我们不计算 'folder' 类型的文件
        },
        pan: {
          userId: user.id,
        },
      },
    });

    // 添加到数组中，日期格式化为 'YYYY-MM-DD'
    uploadFrequencyData.push({
      date: format(day, 'yyyy-MM-dd'),
      次数: dailyUploads,
    });
  }

  // 进度图
  const totalUsedBytes = await prisma.file.findMany({
    where: {
      pan: {
        userId: user.id,
      },
      type: {
        not: 'folder',
      },
    },
  });
  const normalizedData = totalUsedBytes.map((file) => file.size).reduce((pre, current) => pre + current, 0);
  // let convertedBytes = bytes(normalizedData); // 例如："155.79KB"
  // const usedBytesMatch = convertedBytes.match(/\d+(\.\d+)?/);
  // const usedBytesValue = usedBytesMatch ? parseFloat(usedBytesMatch[0]) : 0;

  // console.log({ usedBytesValue });
  // const usedPercentage = (usedBytesValue / (MAX * 1024 * 1024 * 1024)) * 100; // 计算百分比
  // let displayPercentage;

  // if (usedPercentage < 0.01) {
  //   displayPercentage = '0.01';
  // } else if (usedPercentage === 0) {
  //   displayPercentage = '0.00';
  // } else {
  //   displayPercentage = usedPercentage.toFixed(2); // 否则，四舍五入到两位小数
  // }

  const maxCapacityGB = 3;
  const totalSizeGB = normalizedData / (1024 * 1024 * 1024);
  const usedSize = (totalSizeGB / maxCapacityGB) * 100;

  return (
    <ScrollArea className="h-[660px] w-full rounded-md border px-2 ">
      <div className="w-full h-full grid grid-rows-2 grid-cols-2 gap-4 p-2">
        <div className=" flex flex-col items-center justify-center p-4">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            网盘文件类型统计
          </h3>
          <Bar chartData={barChartData} />
        </div>
        <div className=" flex flex-col items-center justify-center p-4">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            过去一周内上传的频率
          </h3>
          <Line chartData={uploadFrequencyData} />
        </div>
        <div className="flex flex-col items-center justify-center p-4 col-span-2">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            网盘已用容量
          </h3>
          <Example chartdata={usedSize.toFixed(2)} />
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChartsPage;
