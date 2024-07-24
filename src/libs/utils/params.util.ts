export class ParamsUtil {
    public getDecodedQueryParams(data: string): { [key: string]: string } {
      let params: { [key: string]: string } = {};
      if (data) {
        const approvalData = window.atob(data ?? '');
        params = this.getQueryParams(approvalData);
      }
      return params;
    }
  
    public getQueryParams(data: string): { [key: string]: string } {
      const params: { [key: string]: string } = {};
      if (data) {
        const splitData = data?.split('&');
        splitData
          .map((d) => d.split('='))
          .filter((d) => d.length > 1)
          .forEach((d) => (params[d[0]] = d[1]));
      }
      return params;
    }
  }