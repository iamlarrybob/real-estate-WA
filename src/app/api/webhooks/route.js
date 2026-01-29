import { Webhook } from 'svix'
import { headers } from 'next/headers'
// import { webhookEvent } from '@clerk/nextjs/server'


export async function POST (req) {

    const SIGNING_SECRET = process.env.SIGNING_SECRET

    if (!SIGNING_SECRET) {
        throw new Error('Error: Please add SIGNING_SECRET from Clerk Dashboard to .env or .env.local')
    }

    //create new Svix instance with Secret 
    const wh = new Webhook(SIGNING_SECRET)

    const headerPayload = await headers()
    const svix_id = headerPayload.get('svix-id')
    const svix_timestamp = headerPayload.get('svix-timestamp')
    const svix_signature = headerPayload.get('svix-signature')

    // if there are no headers, error out

    if (!svix_id || !svix_timestamp || !svix_signature ) {
        return new Response('Error: Missing Svix headers',{
            status:400,
        })
    }

    //Get body
    const payload = await req.json()
    const body = JSON.stringify(payload)

    let evt;
    
    // verify payload with headers

    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature
        })
    } catch(err) {
        console.error('Error: could not verify webhook:', err)
        return new Response ('Error:Verification error', {
            status: 400,
        })
    }

    // do something with payload 
    // for this guide, log payload to console

    const { id } = evt.data
    const eventType = evt.type
    // console.log(`received webhook with ID ${id} and event type of ${eventType}`
    // )
    // console.log('webhook payload:', body)

    if (evt.type === 'user.created') {
        console.log('user.created')
    }
    if (evt.type === 'user.updated') {
        console.log('user.updated')
    }
    if (evt.type === 'user.deleted') {
        console.log('user.deleted')
    }




    return new Response ('webhook received', { status: 200})
}

