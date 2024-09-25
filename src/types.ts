export type CookieOptions = {
  name: string
  value: string
  domain?: string
  path?: string
  /**
   * Expires | Max-Age(seconds or Date Object or Date string)
   */
  expires?: number | string | Date
  httpOnly?: boolean
  secure?: boolean
  partitioned?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None' | boolean
  priority?: 'Low' | 'Medium' | 'High'
}
