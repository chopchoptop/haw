export type Message<T> =
    | {
          code: 0;
          message: 'success';
          created: string;
          data: T;
      }
    | {
          code: number;
          message: string;
          created: string;
          data?: undefined;
      };
