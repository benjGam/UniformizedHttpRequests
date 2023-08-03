import axios from 'axios';
import { HttpRoutes } from './http-routes';
import { ApiResponse } from './api-response';

export class HttpUtils {
  private static _apiUrl: string;

  public static Init(apiUrl: string) {
    this._apiUrl = apiUrl;
  }

  public static async get(
    route: HttpRoutes,
    parameters: string | string[] | undefined = undefined,
    data: any = undefined,
  ): Promise<ApiResponse> {
    try {
      return new ApiResponse(
        (
          await axios.get(
            `${this._apiUrl}${await this.formatRoute(route, parameters)}`,
            data,
          )
        ).data,
      );
    } catch (request_error: any) {
      this.logError(request_error);
      console.log(request_error.response.data);
      return new ApiResponse(request_error.response.data);
    }
  }

  public static async post(
    route: HttpRoutes,
    parameters: string | string[] | undefined = undefined,
    data: any = undefined,
  ): Promise<ApiResponse> {
    try {
      return new ApiResponse(
        (
          await axios.post(
            `${this._apiUrl}${await this.formatRoute(route, parameters)}`,
            data,
          )
        ).data,
      );
    } catch (request_error: any) {
      this.logError(request_error);
      return new ApiResponse(request_error.data);
    }
  }

  public static async patch(
    route: HttpRoutes,
    parameters: string | string[] | undefined = undefined,
    data: any = undefined,
  ): Promise<ApiResponse> {
    try {
      return new ApiResponse(
        (
          await axios.patch(
            `${this._apiUrl}${await this.formatRoute(route, parameters)}`,
            data,
          )
        ).data,
      );
    } catch (request_error: any) {
      this.logError(request_error);
      return new ApiResponse(request_error.data);
    }
  }

  public static async delete(
    route: HttpRoutes,
    parameters: string | string[] | undefined = undefined,
  ): Promise<ApiResponse> {
    try {
      return new ApiResponse(
        (
          await axios.delete(
            `${this._apiUrl}${await this.formatRoute(route, parameters)}`,
          )
        ).data,
      );
    } catch (request_error: any) {
      this.logError(request_error);
      return new ApiResponse(request_error.data);
    }
  }

  // Internal methods

  private static async logError(error: any) {
    if (error.response) {
      console.log('Status code : ' + error.response.status);
      console.error('Response datas: ' + JSON.stringify(error.response.data));
      console.error('Headers: \n\n' + error.response.headers);
    } else if (error.request) {
      console.error('No response recieved: ' + error.request);
    } else {
      console.error(
        "Request configuration wasn't recognizated: " + error.message,
      );
    }
  }

  private static async formatRoute(
    route: HttpRoutes,
    request_parameters?: string | string[],
  ) {
    if (request_parameters === undefined) return route;

    if (typeof request_parameters == 'string') {
      return route.replace(/:(\w+)/, request_parameters as string);
    }

    let formatted_route = route as string;
    for (const request_parameter of request_parameters as string[]) {
      formatted_route = formatted_route.replace(/:(\w+)/, request_parameter);
    }
    return formatted_route;
  }
}
