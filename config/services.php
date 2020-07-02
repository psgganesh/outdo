<?php

return [

    'bitbucket' => [
        'client_id' => env('BITBUCKET_CLIENT_ID'),
        'client_secret' => env('BITBUCKET_CLIENT_SECRET'),
        'redirect' => env('BITBUCKET_REDIRECT_URI')
    ],

    'twilio' => [
        'sid' => env('TWILIO_ACCOUNT_SID'),
        'key' => env('TWILIO_API_KEY'),
        'secret' => env('TWILIO_SECRET'),
        'grant' => env('TWILIO_CHAT_SID')
    ]
];
