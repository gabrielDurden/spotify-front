import { OrderListPipe } from './order-list.pipe';
import * as mockRaw from '../../data/tracks.json'
import { TrackModel } from '@core/models/tracks.model';

describe('OrderListPipe', () => {
  it('create an instance', () => {
    const pipe = new OrderListPipe();
    expect(pipe).toBeTruthy();
  });

  it('Testing values', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default
    const result: TrackModel[] = pipe.transform(data)
    expect(result).toEqual(data)
  })

  it('Testing if the order asc is right', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default
    const firstValue = data.find((i: any) => i._id === 7)
    const lastValue = data.find((i: any) => i._id === 6)
    const result: TrackModel[] = pipe.transform(data, 'name', 'asc')
    const firstResult = result[0]
    const lastResult = result[result.length - 1]
    expect(firstResult).toEqual(firstValue)
    expect(lastResult).toEqual(lastValue)
  })

  it('Testing if the order desc is right', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default
    const firstValue = data.find((i: any) => i._id === 7)
    const lastValue = data.find((i: any) => i._id === 6)
    const result: TrackModel[] = pipe.transform(data, 'name', 'desc')
    const firstResult = result[0]
    const lastResult = result[result.length - 1]
    expect(firstResult).toEqual(lastValue)
    expect(lastResult).toEqual(firstValue)
  })

  it('Testing if error is caugth', () => {
    const pipe = new OrderListPipe();
    const { data }: any = (mockRaw as any).default
    const value = data[1]
    const result: TrackModel[] = pipe.transform(value, 'name', 'desc')
    expect(result).toEqual(value)
  })

  it('Testing if value is the same', () => {
    const pipe = new OrderListPipe();
    const value = [[2,3],['data','231'],[true, false]]
    const result: Array<any> = pipe.transform(value, 'name', 'desc')
    expect(result).toEqual(value)
  })

});
