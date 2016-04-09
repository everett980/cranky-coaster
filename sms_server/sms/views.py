from django.http import HttpResponse

def index(request):
    import twilio
    import twilio.rest
    import os

    try:
        account_sid = os.environ.get('TWILIO_SID')
        auth_token = os.environ.get('TWILIO_AUTH_TOKEN')
        client = twilio.rest.TwilioRestClient(account_sid, auth_token)

        message = client.messages.create(
            body="Hey Yus",
            to="+19177245806",
            from_="+12015968899"
        )
    except twilio.TwilioRestException as e:
        print e
    return HttpResponse("Sent. Like a kool koala.")
