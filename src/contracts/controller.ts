export type HTTPResponse = {
  statusCode: number;
  body: unknown;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type HTTPRequest<T = any> = {
  headers: {
    authorization?: string;
  };
  body: T;
  params: Record<string, string>;
  query: Record<string, string | string[]>;
}

export interface Controller {
  handle(request: HTTPRequest): Promise<HTTPResponse>
};