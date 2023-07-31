export class ApiResponse {
  private readonly statusCode: number;
  private readonly data: any;
  private readonly message: string;

  constructor(json_response: any) {
    this.statusCode = json_response['statusCode'];
    this.data = json_response['data'];
    this.message = json_response['message'];
  }

  // Getters

  get Message(): string {
    return this.message;
  }

  get StatusCode(): number {
    return this.statusCode;
  }

  get Data(): any {
    return this.data;
  }
}
