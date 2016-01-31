
      
      function mapMetupData(data){
           var tmpMapped = null;
           var tmpLogoUrl = 'https://cdn0.iconfinder.com/data/icons/social-flat-rounded-rects/512/meetup-128.png';
           
           if(data){
                   tmpMapped = [];
                   for(var i = 0;i<data.length; i++){
                           tmpMapped.push({name:data[i].name, url:data[i].event_url, logo:tmpLogoUrl})
                   }
           }
        return tmpMapped;
      }
        
      function mapEventbriteData(data){
            var tmpMapped = null;
            var tmpLogoUrl = 'https://hubaaa.com/apps/logos/eventbrite.png';
           
           if(data){
                   tmpMapped = [];
                   for(var i = 0;i<data.length; i++){
                           tmpMapped.push({name:data[i].name.text, url:data[i].url, logo:tmpLogoUrl})
                   }
           }
        return tmpMapped;
      }
          
      function fillEventList(data){
              
              for(var i = 0; i<data.length;i++){
                      $("#tmp-event-row").tmpl(data[i]).appendTo("#eventContainer");
              }    
      }
      
      function onSearchClick(){
             var txtKeys = $('#txtKW');
             var txtLoc = $('#txtLoc');
             
             searchEvent(txtKeys, txtLoc);
      }

      function searchEvent(key, location){
              
              var meetupUrl = 'https://api.meetup.com/2/open_events?zip=10006&and_text=False&offset=0&format=json&limited_events=False&photo-host=public&page=20&radius=25.0&desc=False&status=upcoming&sig_id=198887180&sig=adf94592560751c050efa6e6a58a36e7060a456f';
              
              $.ajax({
                type: "GET",
                dataType: 'jsonp',
                url: meetupUrl,
                success: function(data){
                        
                        var tmpData = mapMetupData(data.results);
                        fillEventList(tmpData);
                } 
              });
        
                var eventBitUrl = 'https://www.eventbriteapi.com/v3/events/search/?q=party&token=4E6D7PNRKCV5Q3Q6FJWV';
                
                $.ajax({
                        type: "GET",
                        crossDomain:true,
                        url: eventBitUrl,
                        success: function(data){
                               
                               var tmpData = mapEventbriteData(data.events);
                                fillEventList(tmpData);
                        },
                        error: function(x,h,e){
                                console.log(x);
                        }
                });
      }           