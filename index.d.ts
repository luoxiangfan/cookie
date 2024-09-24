declare module 'js-simple-cookie' {
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
    sameSite?: 'Strict' | 'Lax' | 'None'
    priority?: 'Low' | 'Medium' | 'High'
  }
  export function get(name: string): string | null
  export function set(options: CookieOptions): boolean
  export function remove(name: string, path: string, domain: string): boolean
  export function has(name: string): boolean
  export function keys(): string[]
  export default Cookies = {
    get,
    set,
    remove,
    has,
    keys
  }
}