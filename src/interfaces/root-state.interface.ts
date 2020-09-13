import { IEvent } from './event.interface';

export interface RootState {}

export interface IActiveItemState {
  activeItem: IEvent | null;
  loading: boolean;
  fetchError: Error | null;
}
