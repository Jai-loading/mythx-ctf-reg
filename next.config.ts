import { NextConfig } from 'next';
import dotenv from 'dotenv';
import WebpackObfuscator from 'webpack-obfuscator';
import { Configuration } from 'webpack';

dotenv.config();

const nextConfig: NextConfig = {
  output: 'standalone', // Optimized for Docker/EC2 deployment
  webpack(config: Configuration, { isServer }: { isServer: boolean }) {
    if (!isServer && process.env.NODE_ENV === 'production') {
      config.plugins = config.plugins || [];

      config.plugins.push(
        new WebpackObfuscator(
          {
            rotateStringArray: true,
            stringArrayThreshold: 0.5, // Reduced to save memory
            deadCodeInjection: false, // Disabled: too heavy for t3.micro builds
            stringArray: true,
            numbersToExpressions: false, // Disabled: too CPU intensive
          },
          [
            '**/node_modules/**',
            '**/.next/**',
            '**/react-dom/**',
            '**/react/**',
          ]
        )
      );
    }
    return config;
  },
};

export default nextConfig;

