import React from 'react';
import Bar from './bar';
import { ScrollArea } from '@/components/ui/scroll-area';
import prisma from '@/lib/prisma';
import { subDays, startOfDay, endOfDay, addDays, format } from 'date-fns';

import Line from './line';

const ChartsPage = async () => {
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
      },
    });

    // 添加到数组中，日期格式化为 'YYYY-MM-DD'
    uploadFrequencyData.push({
      date: format(day, 'yyyy-MM-dd'),
      次数: dailyUploads,
    });
  }

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
        <div className=" flex flex-col items-center justify-center p-4">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Number of species threatened with extinction (2021)
          </h3>
          <Bar />
        </div>
        <div className=" flex flex-col items-center justify-center p-4">
          <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
            Number of species threatened with extinction (2021)
          </h3>
          <Bar />
        </div>
      </div>
    </ScrollArea>
  );
};

export default ChartsPage;
