import { kv, createClient } from '@vercel/kv';

const KV_URL="redis://default:7351cd75931f4d80896848732af50aae@balanced-sawfly-36804.kv.vercel-storage.com:36804"
const KV_REST_API_URL="https://balanced-sawfly-36804.kv.vercel-storage.com"
const KV_REST_API_TOKEN="AY_EASQgMWQxODVkOGYtMDgyOS00MWIyLTkyNzMtOWEzMGRiN2MyZjA2NzM1MWNkNzU5MzFmNGQ4MDg5Njg0ODczMmFmNTBhYWU="
const KV_REST_API_READ_ONLY_TOKEN="Ao_EASQgMWQxODVkOGYtMDgyOS00MWIyLTkyNzMtOWEzMGRiN2MyZjA2jksIUkxb-Wf1sU3W5cmL5dKGSqjPTgfqaBirt-C86Q4="

export const client = createClient({
      url: KV_REST_API_URL,
      token: KV_REST_API_TOKEN,
    });