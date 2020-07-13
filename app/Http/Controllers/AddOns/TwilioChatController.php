<?php

namespace App\Http\Controllers\AddOns;

use Twilio\Rest\Client;
use Illuminate\Http\Request;
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\ChatGrant;
use Twilio\Jwt\Grants\VideoGrant;

class TwilioChatController
{
    private $twilio_account_sid;
    private $twilio_api_key;
    private $twilio_api_secret;
    private $service_sid;
    private $identity;

    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->twilio_account_sid = config('services.twilio.sid');
        $this->twilio_api_key = config('services.twilio.key');
        $this->twilio_api_secret = config('services.twilio.secret');
        $this->service_sid = config('services.twilio.grant');
        $this->identity = '';
    }

    /**
     * Create access token, which we will serialize and send to the client
     * 
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function getToken(Request $request)
    {
        $this->identity = $request->identity;
        
        $token = new AccessToken(
            $this->twilio_account_sid,
            $this->twilio_api_key,
            $this->twilio_api_secret,
            3600,
            $this->identity
        );
    
        // Create Chat grant
        $chat_grant = new ChatGrant();
        $chat_grant->setServiceSid($this->service_sid);

        // Create Video grant
        $video_grant = new VideoGrant();
        
        // Add grant to token
        $token->addGrant($chat_grant);
        $token->addGrant($video_grant);
    
        return response()->json([
            'token' => $token->toJWT()
        ]);
    }
}