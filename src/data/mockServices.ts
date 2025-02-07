import { Service } from '../types/service';

export const mockServices: Service[] = [
    {
        code: 'delivery',
        name: '配送',
        children: [
            {
                code: 'express',
                name: '快递',
                children: [
                    {
                        code: 'same-day',
                        name: '当日达'
                    },
                    {
                        code: 'next-day',
                        name: '次日达'
                    }
                ]
            },
            {
                code: 'cold-chain',
                name: '冷链',
                children: [
                    {
                        code: 'frozen',
                        name: '冷冻'
                    },
                    {
                        code: 'refrigerated',
                        name: '冷藏'
                    }
                ]
            }
        ]
    },
    {
        code: 'warehouse',
        name: '仓储',
        children: [
            {
                code: 'standard',
                name: '标准仓'
            },
            {
                code: 'bonded',
                name: '保税仓'
            }
        ]
    }
];
