import * as marked from 'marked';
import { Tokens } from 'marked';

/**
 * Parse Inline Markdown to HTML.
 * Requires a valid license for commercial use in Node.js environment.
 * Call configureLicense() before using this function in server-side code.
 * Browser usage does not require license configuration.
 */
declare const renderMarkdownCompact: (text: string) => {
    parsed: string;
    lexed: marked.Token[];
    time: number;
};

/**
 * Parse Markdown to HTML.
 * Requires a valid license for commercial use in Node.js environment.
 * Call configureLicense() before using this function in server-side code.
 * Browser usage does not require license configuration.
 */
declare const renderMarkdown: (text: string) => {
    parsed: string;
    lexed: Tokens.Generic[];
    time: number;
};

/**
 * convert TeX to SVG in HTML.
 */
declare const tex2svg: (html: string) => string;

/**
 * How often to inject warning for unlicensed usage (default: 1000)
 * Can be changed in tests或调试
 */
declare let UNLICENSED_WARNING_INTERVAL: number;
/**
 * Set the interval for unlicensed warning injection (for testing/debugging)
 */
declare function setUnlicensedWarningInterval(interval: number): void;
interface LicenseConfig {
    /** API key for license verification */
    apiKey: string;
}
interface LicenseValidationResult {
    valid: boolean;
    message?: string;
    expiresAt?: Date;
    tier?: 'free' | 'basic' | 'pro' | 'enterprise';
}
interface UsageStats {
    /** Total number of function calls */
    totalCalls: number;
    /** Number of renderMarkdown calls */
    renderMarkdownCalls: number;
    /** Number of renderMarkdownCompact calls */
    renderMarkdownCompactCalls: number;
    /** First usage timestamp */
    firstUsedAt: number;
    /** Last usage timestamp */
    lastUsedAt: number;
    /** API key (for tracking) */
    apiKey?: string;
    /** Node.js version */
    nodeVersion?: string;
    /** Last reported timestamp (to avoid duplicate reports) */
    lastReportedAt?: number;
    /** Session ID for aggregating stats across deployments */
    sessionId?: string;
}
/**
 * Track function call (internal use)
 */
declare function trackFunctionCall(functionName: 'renderMarkdown' | 'renderMarkdownCompact'): void;
/**
 * Check if warning should be injected (every 1000 unlicensed calls in Node.js)
 * Returns the warning HTML if needed, otherwise returns empty string
 */
declare function getWarningIfNeeded(): string;
/**
 * Configure global license settings
 * Note: License validation only works in Node.js environment
 */
declare function configureLicense(config: LicenseConfig): void;
/**
 * Get current license configuration
 */
declare function getLicenseConfig(): LicenseConfig | null;
/**
 * Main license validation function
 */
declare function validateLicense(): Promise<LicenseValidationResult>;
/**
 * Check if library is licensed (sync version for quick checks)
 * This checks the cache only. For full remote validation, use validateLicense()
 * Note: In browser environment, always returns false (license validation is Node.js only)
 */
declare function isLicensed(): boolean;
/**
 * Clear validation cache (useful for testing)
 */
declare function clearValidationCache(): void;
/**
 * Reset usage statistics (useful for testing)
 */
declare function resetUsageStats(): void;

export { UNLICENSED_WARNING_INTERVAL, clearValidationCache, configureLicense, getLicenseConfig, getWarningIfNeeded, isLicensed, renderMarkdown, renderMarkdownCompact, resetUsageStats, setUnlicensedWarningInterval, tex2svg, trackFunctionCall, validateLicense };
export type { LicenseConfig, LicenseValidationResult, UsageStats };
