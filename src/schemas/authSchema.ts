import { z } from 'zod';

export const signupSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Please enter a valid email address')
    .refine((email) => {
      const domain = email.split('@')[1];
      const validDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
        'aol.com', 'protonmail.com', 'mail.com', 'live.com', 'msn.com',
        'test.com', 'example.com', 'domain.com', 'company.com', 'business.com',
        'org', 'net', 'edu', 'gov', 'mil', 'io', 'co', 'me', 'tv', 'app',
        'dev', 'tech', 'digital', 'online', 'web', 'site', 'info', 'biz'
      ];
      
      // Check if domain ends with a valid TLD or common domain
      const hasValidDomain = validDomains.some(validDomain => 
        domain.endsWith(validDomain) || 
        /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z]{2,})$/.test(domain)
      );
      
      return hasValidDomain;
    }, 'Please enter a valid email address with a proper domain'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(30, 'Username too long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one lowercase letter, one uppercase letter, and one number'),
});

export const signinSchema = z.object({
  email: z.string()
    .email('Invalid email address')
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/, 'Please enter a valid email address')
    .refine((email) => {
      const domain = email.split('@')[1];
      const validDomains = [
        'gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'icloud.com',
        'aol.com', 'protonmail.com', 'mail.com', 'live.com', 'msn.com',
        'test.com', 'example.com', 'domain.com', 'company.com', 'business.com',
        'org', 'net', 'edu', 'gov', 'mil', 'io', 'co', 'me', 'tv', 'app',
        'dev', 'tech', 'digital', 'online', 'web', 'site', 'info', 'biz'
      ];
      
      // Check if domain ends with a valid TLD or common domain
      const hasValidDomain = validDomains.some(validDomain => 
        domain.endsWith(validDomain) || 
        /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?\.(?:[a-zA-Z]{2,})$/.test(domain)
      );
      
      return hasValidDomain;
    }, 'Please enter a valid email address with a proper domain'),
  password: z.string().min(1, 'Password is required')
});

export type SignupInput = z.infer<typeof signupSchema>;
export type SigninInput = z.infer<typeof signinSchema>; 