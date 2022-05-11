import { HttpRequest, HttpResponse } from './http'

export interface MIddleware {
  handle(httpRequest: HttpRequest): Promise<HttpResponse>
}
