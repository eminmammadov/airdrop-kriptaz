/**
 * SEO Testing and Validation Utilities
 * Automated testing framework for SEO compliance
 */

import { SEOConfig } from '@/types/seo';

export interface SEOTestResult {
  test: string;
  passed: boolean;
  message: string;
  severity: 'error' | 'warning' | 'info';
  score: number;
}

export interface SEOAuditResult {
  overallScore: number;
  totalTests: number;
  passedTests: number;
  failedTests: number;
  results: SEOTestResult[];
  recommendations: string[];
}

/**
 * Core SEO Tests
 */
export class SEOTester {
  private tests: Array<(config: SEOConfig, url?: string) => SEOTestResult> = [];

  constructor() {
    this.registerDefaultTests();
  }

  private registerDefaultTests() {
    // Title tests
    this.addTest('title-exists', (config) => ({
      test: 'Title Exists',
      passed: !!config.title,
      message: config.title ? 'Title is present' : 'Title is missing',
      severity: config.title ? 'info' : 'error',
      score: config.title ? 10 : 0,
    }));

    this.addTest('title-length', (config) => {
      const length = config.title?.length || 0;
      const optimal = length >= 30 && length <= 60;
      return {
        test: 'Title Length',
        passed: optimal,
        message: optimal 
          ? `Title length is optimal (${length} characters)`
          : `Title length is ${length < 30 ? 'too short' : 'too long'} (${length} characters)`,
        severity: optimal ? 'info' : 'warning',
        score: optimal ? 10 : length > 0 ? 5 : 0,
      };
    });

    // Description tests
    this.addTest('description-exists', (config) => ({
      test: 'Meta Description Exists',
      passed: !!config.description,
      message: config.description ? 'Meta description is present' : 'Meta description is missing',
      severity: config.description ? 'info' : 'error',
      score: config.description ? 10 : 0,
    }));

    this.addTest('description-length', (config) => {
      const length = config.description?.length || 0;
      const optimal = length >= 120 && length <= 160;
      return {
        test: 'Meta Description Length',
        passed: optimal,
        message: optimal 
          ? `Description length is optimal (${length} characters)`
          : `Description length is ${length < 120 ? 'too short' : 'too long'} (${length} characters)`,
        severity: optimal ? 'info' : 'warning',
        score: optimal ? 10 : length > 0 ? 5 : 0,
      };
    });

    // Keywords tests
    this.addTest('keywords-count', (config) => {
      const count = config.keywords?.length || 0;
      const optimal = count >= 3 && count <= 10;
      return {
        test: 'Keywords Count',
        passed: optimal,
        message: optimal 
          ? `Keywords count is optimal (${count} keywords)`
          : count === 0 
            ? 'No keywords specified'
            : `Too many keywords (${count}, recommended: 3-10)`,
        severity: optimal ? 'info' : 'warning',
        score: optimal ? 8 : count > 0 ? 4 : 0,
      };
    });

    // Open Graph tests
    this.addTest('og-title', (config) => ({
      test: 'Open Graph Title',
      passed: !!config.openGraph?.title,
      message: config.openGraph?.title ? 'OG title is present' : 'OG title is missing',
      severity: config.openGraph?.title ? 'info' : 'warning',
      score: config.openGraph?.title ? 8 : 0,
    }));

    this.addTest('og-description', (config) => ({
      test: 'Open Graph Description',
      passed: !!config.openGraph?.description,
      message: config.openGraph?.description ? 'OG description is present' : 'OG description is missing',
      severity: config.openGraph?.description ? 'info' : 'warning',
      score: config.openGraph?.description ? 8 : 0,
    }));

    this.addTest('og-image', (config) => {
      const hasImage = config.openGraph?.images && config.openGraph.images.length > 0;
      return {
        test: 'Open Graph Image',
        passed: !!hasImage,
        message: hasImage ? 'OG image is present' : 'OG image is missing',
        severity: hasImage ? 'info' : 'warning',
        score: hasImage ? 8 : 0,
      };
    });

    // Twitter Card tests
    this.addTest('twitter-card', (config) => ({
      test: 'Twitter Card Type',
      passed: !!config.twitter?.card,
      message: config.twitter?.card ? `Twitter card type: ${config.twitter.card}` : 'Twitter card type is missing',
      severity: config.twitter?.card ? 'info' : 'warning',
      score: config.twitter?.card ? 6 : 0,
    }));

    // Canonical URL test
    this.addTest('canonical-url', (config) => ({
      test: 'Canonical URL',
      passed: !!config.canonical,
      message: config.canonical ? 'Canonical URL is present' : 'Canonical URL is missing',
      severity: config.canonical ? 'info' : 'warning',
      score: config.canonical ? 6 : 0,
    }));

    // Robots test
    this.addTest('robots-directive', (config) => {
      const hasRobots = !!config.robots;
      return {
        test: 'Robots Directive',
        passed: hasRobots,
        message: hasRobots ? 'Robots directive is configured' : 'Robots directive is missing',
        severity: hasRobots ? 'info' : 'warning',
        score: hasRobots ? 4 : 0,
      };
    });
  }

  addTest(name: string, testFn: (config: SEOConfig, url?: string) => SEOTestResult) {
    this.tests.push(testFn);
  }

  async runAudit(config: SEOConfig, url?: string): Promise<SEOAuditResult> {
    const results: SEOTestResult[] = [];
    
    // Run all tests
    for (const test of this.tests) {
      try {
        const result = test(config, url);
        results.push(result);
      } catch (error) {
        results.push({
          test: 'Test Error',
          passed: false,
          message: `Test failed: ${error}`,
          severity: 'error',
          score: 0,
        });
      }
    }

    // Calculate scores
    const totalTests = results.length;
    const passedTests = results.filter(r => r.passed).length;
    const failedTests = totalTests - passedTests;
    const totalScore = results.reduce((sum, r) => sum + r.score, 0);
    const maxScore = totalTests * 10; // Assuming max score per test is 10
    const overallScore = Math.round((totalScore / maxScore) * 100);

    // Generate recommendations
    const recommendations = this.generateRecommendations(results);

    return {
      overallScore,
      totalTests,
      passedTests,
      failedTests,
      results,
      recommendations,
    };
  }

  private generateRecommendations(results: SEOTestResult[]): string[] {
    const recommendations: string[] = [];
    
    results.forEach(result => {
      if (!result.passed) {
        switch (result.test) {
          case 'Title Exists':
            recommendations.push('Add a descriptive title tag to improve search visibility');
            break;
          case 'Title Length':
            recommendations.push('Optimize title length to 30-60 characters for better SERP display');
            break;
          case 'Meta Description Exists':
            recommendations.push('Add a meta description to improve click-through rates');
            break;
          case 'Meta Description Length':
            recommendations.push('Optimize meta description length to 120-160 characters');
            break;
          case 'Open Graph Image':
            recommendations.push('Add Open Graph images for better social media sharing');
            break;
          case 'Twitter Card Type':
            recommendations.push('Configure Twitter Card for enhanced Twitter sharing');
            break;
          case 'Canonical URL':
            recommendations.push('Add canonical URL to prevent duplicate content issues');
            break;
        }
      }
    });

    return recommendations;
  }
}

/**
 * Performance Testing
 */
export class SEOPerformanceTester {
  async testCoreWebVitals(): Promise<{
    lcp: number | null;
    fid: number | null;
    cls: number | null;
    fcp: number | null;
    ttfb: number | null;
  }> {
    if (typeof window === 'undefined') {
      return { lcp: null, fid: null, cls: null, fcp: null, ttfb: null };
    }

    return new Promise((resolve) => {
      const metrics: { lcp: number | null; fid: number | null; cls: number | null; fcp: number | null; ttfb: number | null } = {
        lcp: null,
        fid: null,
        cls: null,
        fcp: null,
        ttfb: null
      };

      // Use Web Vitals API if available
      if ('PerformanceObserver' in window) {
        // LCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const lastEntry = entries[entries.length - 1];
            metrics.lcp = lastEntry.startTime;
          }
        }).observe({ entryTypes: ['largest-contentful-paint'] });

        // FCP
        new PerformanceObserver((list) => {
          const entries = list.getEntries();
          if (entries.length > 0) {
            const firstEntry = entries[0];
            metrics.fcp = firstEntry.startTime;
          }
        }).observe({ entryTypes: ['paint'] });

        // CLS
        new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries()) {
            const layoutShiftEntry = entry as PerformanceEntry & { hadRecentInput?: boolean; value?: number };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value || 0;
            }
          }
          metrics.cls = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
      }

      // Return metrics after a delay
      setTimeout(() => resolve(metrics), 3000);
    });
  }

  async testPageSpeed(): Promise<{
    loadTime: number;
    domContentLoaded: number;
    firstByte: number;
  }> {
    if (typeof window === 'undefined') {
      return { loadTime: 0, domContentLoaded: 0, firstByte: 0 };
    }

    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    return {
      loadTime: navigation.loadEventEnd - navigation.loadEventStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      firstByte: navigation.responseStart - navigation.requestStart,
    };
  }
}

/**
 * Accessibility Testing
 */
export class SEOAccessibilityTester {
  testHeadingHierarchy(): SEOTestResult {
    if (typeof window === 'undefined') {
      return {
        test: 'Heading Hierarchy',
        passed: true,
        message: 'Cannot test heading hierarchy on server',
        severity: 'info',
        score: 0,
      };
    }

    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    const levels = headings.map(h => parseInt(h.tagName.charAt(1)));
    
    let isValid = true;
    let message = 'Heading hierarchy is correct';
    
    // Check if there's exactly one h1
    const h1Count = levels.filter(level => level === 1).length;
    if (h1Count !== 1) {
      isValid = false;
      message = `Found ${h1Count} h1 elements (should be exactly 1)`;
    }
    
    // Check for skipped levels
    for (let i = 1; i < levels.length; i++) {
      if (levels[i] - levels[i - 1] > 1) {
        isValid = false;
        message = 'Heading hierarchy has skipped levels';
        break;
      }
    }

    return {
      test: 'Heading Hierarchy',
      passed: isValid,
      message,
      severity: isValid ? 'info' : 'warning',
      score: isValid ? 8 : 4,
    };
  }

  testImageAltText(): SEOTestResult {
    if (typeof window === 'undefined') {
      return {
        test: 'Image Alt Text',
        passed: true,
        message: 'Cannot test image alt text on server',
        severity: 'info',
        score: 0,
      };
    }

    const images = Array.from(document.querySelectorAll('img'));
    const imagesWithoutAlt = images.filter(img => !img.alt || img.alt.trim() === '');
    
    const passed = imagesWithoutAlt.length === 0;
    
    return {
      test: 'Image Alt Text',
      passed,
      message: passed 
        ? 'All images have alt text'
        : `${imagesWithoutAlt.length} images missing alt text`,
      severity: passed ? 'info' : 'warning',
      score: passed ? 6 : Math.max(0, 6 - imagesWithoutAlt.length),
    };
  }
}

/**
 * Main SEO Audit Function
 */
export async function runFullSEOAudit(config: SEOConfig, url?: string): Promise<SEOAuditResult> {
  const seoTester = new SEOTester();
  const accessibilityTester = new SEOAccessibilityTester();

  // Run basic SEO audit
  const basicAudit = await seoTester.runAudit(config, url);

  // Add accessibility tests
  const headingTest = accessibilityTester.testHeadingHierarchy();
  const imageTest = accessibilityTester.testImageAltText();
  
  basicAudit.results.push(headingTest, imageTest);
  basicAudit.totalTests += 2;
  
  if (headingTest.passed) basicAudit.passedTests++;
  else basicAudit.failedTests++;
  
  if (imageTest.passed) basicAudit.passedTests++;
  else basicAudit.failedTests++;

  // Recalculate overall score
  const totalScore = basicAudit.results.reduce((sum, r) => sum + r.score, 0);
  const maxScore = basicAudit.totalTests * 10;
  basicAudit.overallScore = Math.round((totalScore / maxScore) * 100);

  return basicAudit;
}
