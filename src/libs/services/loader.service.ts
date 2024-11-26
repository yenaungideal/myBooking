import { computed, Injectable, signal, untracked } from '@angular/core';
import { LoaderNames } from '../types/loader-names.enum';
import { ILoaderModel } from '../types/loader.model';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  public readonly loader = computed(() => this.currentLoader());

  private readonly currentLoader = signal<ILoaderModel | undefined>(undefined);
  private loaderData = new Map<LoaderNames, ILoaderModel>();

  public setLoader(config: Partial<ILoaderModel>): void {
    config.name = config.name ?? LoaderNames.global;
    config.disableElement = config.disableElement ?? false;
    config.hasBackdrop = config.hasBackdrop ?? true;
    config.position = config.position ?? 'center';

    let data = this.loaderData.get(config.name);
    if (!data) {
      data = { ...config, loadingCount: 0, isLoading: false } as ILoaderModel;
      this.loaderData.set(data.name, data);
    } else {
      data.disableElement = config.disableElement;
      data.hasBackdrop = config.hasBackdrop;
      data.position = config.position;
    }

    if (config.isLoading) data.loadingCount++;
    else {
      if (data.loadingCount > 0) data.loadingCount--;
      if (data.loadingCount > 0) config.isLoading = true;
    }
    if (data.isLoading !== config.isLoading) {
      data.isLoading = config.isLoading!;
      untracked(() => this.currentLoader.set({ ...data }));
    }
  }

  public resetLoader(name: LoaderNames): void {
    const loader = this.loaderData.get(name);
    if (loader && loader.isLoading) {
      loader.isLoading = false;
      loader.loadingCount = 0;
      untracked(() => this.currentLoader.set({ ...loader }));
    }
  }

  public removeLoader(name: LoaderNames): boolean {
    this.resetLoader(name);
    return this.loaderData.delete(name);
  }
}
