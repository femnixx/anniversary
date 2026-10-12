#!/usr/bin/env node
/**
 * Neon Storage Auto-Configuration Script
 * Run locally: NEON_API_TOKEN="your-token" node setup-neon-storage.js
 */

import fetch from 'node-fetch';

const API_BASE = 'https://api.neon.tech/v1';
const TOKEN = process.env.NEON_API_TOKEN || process.argv[2];

if (!TOKEN) {
  console.error('❌ NEON_API_TOKEN required');
  console.error('Usage: NEON_API_TOKEN="your-token" node setup-neon-storage.js');
  process.exit(1);
}

const headers = {
  'Authorization': `Bearer ${TOKEN}`,
  'Content-Type': 'application/json',
};

async function api(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, { headers, ...options });
  const data = await res.json();
  if (!res.ok) throw new Error(`API ${res.status}: ${JSON.stringify(data)}`);
  return data;
}

async function main() {
  try {
    console.log('🔍 Finding project...');
    const projects = await api('/projects');
    const project = projects.projects?.[0];
    if (!project) throw new Error('No projects found');
    console.log(`✅ Project: ${project.name} (${project.id})`);

    console.log('🔍 Finding branch...');
    const branches = await api(`/projects/${project.id}/branches`);
    const branch = branches.branches?.find(b => b.name === 'production') || branches.branches?.[0];
    if (!branch) throw new Error('No branches found');
    console.log(`✅ Branch: ${branch.name} (${branch.id})`);

    console.log('🔍 Finding storage bucket...');
    const storage = await api(`/projects/${project.id}/storage`);
    const bucket = storage.buckets?.find(b => b.name === 'neondb') || storage.buckets?.[0];
    if (!bucket) throw new Error('No storage buckets found');
    console.log(`✅ Bucket: ${bucket.name} (${bucket.id})`);

    console.log('🔧 Configuring CORS...');
    const corsConfig = {
      corsRules: [
        {
          allowedHeaders: ['*'],
          allowedMethods: ['GET', 'PUT', 'POST', 'DELETE', 'HEAD'],
          allowedOrigins: [
            'https://femnixx.github.io',
            'http://localhost:5173',
            'http://localhost:3000',
            'http://127.0.0.1:5173',
          ],
          exposeHeaders: ['ETag', 'Content-Length'],
          maxAgeSeconds: 3600,
        },
      ],
    };
    await api(`/projects/${project.id}/storage/buckets/${bucket.id}/cors`, {
      method: 'PUT',
      body: JSON.stringify(corsConfig),
    });
    console.log('✅ CORS configured');

    console.log('🔧 Setting bucket policy for public read (signed URLs)...');
    const policy = {
      policy: {
        Version: '2012-10-17',
        Statement: [
          {
            Sid: 'AllowSignedGetObject',
            Effect: 'Allow',
            Principal: '*',
            Action: ['s3:GetObject'],
            Resource: [`arn:aws:s3:::${bucket.name}/*`],
            Condition: {
              StringEquals: {
                'aws:Referer': [
                  'https://femnixx.github.io/',
                  'http://localhost:5173/',
                  'http://localhost:3000/',
                ],
              },
            },
          },
        ],
      },
    };
    await api(`/projects/${project.id}/storage/buckets/${bucket.id}/policy`, {
      method: 'PUT',
      body: JSON.stringify(policy),
    });
    console.log('✅ Bucket policy configured');

    console.log('🔍 Verifying configuration...');
    const verifyCors = await api(`/projects/${project.id}/storage/buckets/${bucket.id}/cors`);
    console.log('CORS:', JSON.stringify(verifyCors, null, 2));

    const verifyPolicy = await api(`/projects/${project.id}/storage/buckets/${bucket.id}/policy`);
    console.log('Policy:', JSON.stringify(verifyPolicy, null, 2));

    console.log('\n🎉 Neon storage configured successfully!');
    console.log(`   Bucket: ${bucket.name}`);
    console.log(`   Endpoint: https://${bucket.id}.storage.c-6.us-east-2.aws.neon.tech`);
    console.log(`   Region: us-east-2`);

  } catch (err) {
    console.error('❌ Error:', err.message);
    process.exit(1);
  }
}

main();