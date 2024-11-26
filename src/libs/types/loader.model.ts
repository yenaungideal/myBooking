import { LoaderNames } from './loader-names.enum';

export interface ILoaderModel {
  name: LoaderNames;
  loadingCount: number;
  isLoading: boolean;
  hasBackdrop: boolean;
  position: 'center' | 'start' | 'end';
  disableElement: boolean;
}
