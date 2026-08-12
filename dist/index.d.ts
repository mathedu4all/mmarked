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
 * Locale support for built-in type names (theorem, proof, etc.)
 */
type Locale = 'zh' | 'en';

/**
 * Parse Markdown to HTML.
 * Requires a valid license for commercial use in Node.js environment.
 * Call configureLicense() before using this function in server-side code.
 * Browser usage does not require license configuration.
 */
declare const renderMarkdown: (text: string, options?: {
    locale?: Locale;
}) => {
    parsed: string;
    lexed: Tokens.Generic[];
    time: number;
};

interface Tex2SvgOptions {
    /** Add <title> element with TeX source inside each SVG for SEO */
    title?: boolean;
    /** Add aria-label attribute with TeX source to each SVG element for accessibility */
    aria?: boolean;
}
/**
 * convert TeX to SVG in HTML.
 * 使用预配置的单例实例，提升性能并保持配置一致性
 */
declare const tex2svg: (html: string, options?: Tex2SvgOptions) => string;

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

export { configureLicense, getLicenseConfig, isLicensed, renderMarkdown, renderMarkdownCompact, tex2svg, validateLicense };
export type { LicenseConfig, LicenseValidationResult, Locale, UsageStats };
