/**
 * API endpoint constants for the application
 * Centralized location for all API routes to maintain consistency
 * and make updates easier
 */
export const API_ENDPOINTS = {
    AUTH: {
        REGISTER: '/user/signup',
        LOGIN: '/user/login',
        LOGOUT: '/user/logout',
        REFRESH_TOKEN: '/auth/refresh',
    },
    USER: {
        BASE: '/user',
        BY_ID: (id: string | number) => `/user/${id}`,
        BY_CREDENTIAL: '/user',
        LIST: '/user',
        UPDATE: (id: string | number) => `/user/${id}`,
        DELETE: (id: string | number) => `/user/${id}`,
    },
    BOOKING: {
        BASE: '/booking',
        BY_ID: (id: string | number) => `/booking/${id}`,
        LIST: '/booking',
        CREATE: '/booking',
        UPDATE: (id: string | number) => `/booking/${id}`,
        DELETE: (id: string | number) => `/booking/${id}`,
    },
} as const;

/**
 * Query key factory for TanStack Query
 * Provides consistent query keys for caching
 */
export const QUERY_KEYS = {
    AUTH: ['auth'] as const,
    USER: {
        all: ['user'] as const,
        lists: () => [...QUERY_KEYS.USER.all, 'list'] as const,
        list: (filters?: Record<string, unknown>) =>
            [...QUERY_KEYS.USER.lists(), filters] as const,
        details: () => [...QUERY_KEYS.USER.all, 'detail'] as const,
        detail: (id: string | number) => [...QUERY_KEYS.USER.details(), id] as const,
    },
    BOOKING: {
        all: ['booking'] as const,
        lists: () => [...QUERY_KEYS.BOOKING.all, 'list'] as const,
        list: (filters?: Record<string, unknown>) =>
            [...QUERY_KEYS.BOOKING.lists(), filters] as const,
        details: () => [...QUERY_KEYS.BOOKING.all, 'detail'] as const,
        detail: (id: string | number) =>
            [...QUERY_KEYS.BOOKING.details(), id] as const,
    },
} as const;
