// Mock data for each source - expanded with more data points
export const mockData = {
  'GTM': {
    title: 'Google Tag Manager Data',
    data: [
      {
        "userId": "u_101",
        "eventType": "page_view",
        "properties": { "url": "/products/electronics", "category": "Electronics" },
        "contact": {
          "email": "user101@example.com",
          "phone": "+1234567890",
          "pushToken": "tok_gtm_101"
        },
        "timestamp": 1695800000000,
        "source": "GTM"
      },
      {
        "userId": "u_102",
        "eventType": "click",
        "properties": { "element": "Add to Cart Button", "product": "Wireless Headphones" },
        "contact": {
          "email": "user102@example.com",
          "phone": "+1234567891",
          "pushToken": "tok_gtm_102"
        },
        "timestamp": 1695800100000,
        "source": "GTM"
      },
      {
        "userId": "u_103",
        "eventType": "form_submit",
        "properties": { "form_id": "newsletter_signup", "page": "/home" },
        "contact": {
          "email": "user103@example.com",
          "phone": "+1234567892",
          "pushToken": "tok_gtm_103"
        },
        "timestamp": 1695800200000,
        "source": "GTM"
      },
      {
        "userId": "u_104",
        "eventType": "scroll",
        "properties": { "depth": "75%", "page": "/products/electronics" },
        "contact": {
          "email": "user104@example.com",
          "phone": "+1234567893",
          "pushToken": "tok_gtm_104"
        },
        "timestamp": 1695800300000,
        "source": "GTM"
      },
      {
        "userId": "u_105",
        "eventType": "video_play",
        "properties": { "video_id": "vid_123", "duration": "120s" },
        "contact": {
          "email": "user105@example.com",
          "phone": "+1234567894",
          "pushToken": "tok_gtm_105"
        },
        "timestamp": 1695800400000,
        "source": "GTM"
      }
    ]
  },
  'Facebook Pixel': {
    title: 'Facebook Pixel Data',
    data: [
      {
        "userId": "u_201",
        "eventType": "ViewContent",
        "properties": { "content_name": "Phone Case", "content_category": "Accessories" },
        "contact": {
          "email": "fbuser201@example.com",
          "phone": "+1234567892",
          "pushToken": "tok_fb_201"
        },
        "timestamp": 1695800200000,
        "source": "Facebook Pixel"
      },
      {
        "userId": "u_202",
        "eventType": "AddToCart",
        "properties": { "content_name": "Bluetooth Speaker", "value": 89.99 },
        "contact": {
          "email": "fbuser202@example.com",
          "phone": "+1234567893",
          "pushToken": "tok_fb_202"
        },
        "timestamp": 1695800300000,
        "source": "Facebook Pixel"
      },
      {
        "userId": "u_203",
        "eventType": "InitiateCheckout",
        "properties": { "content_ids": ["prod_123", "prod_456"], "contents": [{ "id": "prod_123", "quantity": 1 }, { "id": "prod_456", "quantity": 2 }], "value": 150.75 },
        "contact": {
          "email": "fbuser203@example.com",
          "phone": "+1234567894",
          "pushToken": "tok_fb_203"
        },
        "timestamp": 1695800400000,
        "source": "Facebook Pixel"
      },
      {
        "userId": "u_204",
        "eventType": "Purchase",
        "properties": { "content_ids": ["prod_789"], "contents": [{ "id": "prod_789", "quantity": 1 }], "value": 299.99, "currency": "USD" },
        "contact": {
          "email": "fbuser204@example.com",
          "phone": "+1234567895",
          "pushToken": "tok_fb_204"
        },
        "timestamp": 1695800500000,
        "source": "Facebook Pixel"
      },
      {
        "userId": "u_205",
        "eventType": "Lead",
        "properties": { "content_name": "Free Trial Signup", "value": 0 },
        "contact": {
          "email": "fbuser205@example.com",
          "phone": "+1234567896",
          "pushToken": "tok_fb_205"
        },
        "timestamp": 1695800600000,
        "source": "Facebook Pixel"
      }
    ]
  },
  'Google Ads Tag': {
    title: 'Google Ads Conversion Data',
    data: [
      {
        "userId": "u_301",
        "eventType": "purchase",
        "properties": { "conversion_name": "Purchase", "value": 120.50, "currency": "USD" },
        "contact": {
          "email": "adsuser301@example.com",
          "phone": "+1234567894",
          "pushToken": "tok_ads_301"
        },
        "timestamp": 1695800400000,
        "source": "Google Ads Tag"
      },
      {
        "userId": "u_302",
        "eventType": "signup",
        "properties": { "conversion_name": "Newsletter Signup", "value": 0, "currency": "USD" },
        "contact": {
          "email": "adsuser302@example.com",
          "phone": "+1234567895",
          "pushToken": "tok_ads_302"
        },
        "timestamp": 1695800500000,
        "source": "Google Ads Tag"
      },
      {
        "userId": "u_303",
        "eventType": "lead",
        "properties": { "conversion_name": "Contact Form", "value": 0, "currency": "USD" },
        "contact": {
          "email": "adsuser303@example.com",
          "phone": "+1234567896",
          "pushToken": "tok_ads_303"
        },
        "timestamp": 1695800600000,
        "source": "Google Ads Tag"
      },
      {
        "userId": "u_304",
        "eventType": "page_view",
        "properties": { "conversion_name": "Product Page View", "value": 0, "currency": "USD" },
        "contact": {
          "email": "adsuser304@example.com",
          "phone": "+1234567897",
          "pushToken": "tok_ads_304"
        },
        "timestamp": 1695800700000,
        "source": "Google Ads Tag"
      },
      {
        "userId": "u_305",
        "eventType": "engagement",
        "properties": { "conversion_name": "Video View", "value": 0, "currency": "USD" },
        "contact": {
          "email": "adsuser305@example.com",
          "phone": "+1234567898",
          "pushToken": "tok_ads_305"
        },
        "timestamp": 1695800800000,
        "source": "Google Ads Tag"
      }
    ]
  },
  'Facebook Page': {
    title: 'Facebook Page Insights',
    data: [
      {
        "userId": "u_401",
        "eventType": "page_engagement",
        "properties": { "action": "like", "post_id": "p_123" },
        "contact": {
          "email": "pageuser401@example.com",
          "phone": "+1234567895",
          "pushToken": "tok_page_401"
        },
        "timestamp": 1695800500000,
        "source": "Facebook Page"
      },
      {
        "userId": "u_402",
        "eventType": "page_engagement",
        "properties": { "action": "comment", "post_id": "p_124" },
        "contact": {
          "email": "pageuser402@example.com",
          "phone": "+1234567896",
          "pushToken": "tok_page_402"
        },
        "timestamp": 1695800600000,
        "source": "Facebook Page"
      },
      {
        "userId": "u_403",
        "eventType": "page_engagement",
        "properties": { "action": "share", "post_id": "p_125" },
        "contact": {
          "email": "pageuser403@example.com",
          "phone": "+1234567897",
          "pushToken": "tok_page_403"
        },
        "timestamp": 1695800700000,
        "source": "Facebook Page"
      },
      {
        "userId": "u_404",
        "eventType": "page_view",
        "properties": { "page": "About Us" },
        "contact": {
          "email": "pageuser404@example.com",
          "phone": "+1234567898",
          "pushToken": "tok_page_404"
        },
        "timestamp": 1695800800000,
        "source": "Facebook Page"
      },
      {
        "userId": "u_405",
        "eventType": "message",
        "properties": { "message_content": "Product inquiry" },
        "contact": {
          "email": "pageuser405@example.com",
          "phone": "+1234567899",
          "pushToken": "tok_page_405"
        },
        "timestamp": 1695800900000,
        "source": "Facebook Page"
      }
    ]
  },
  'Website': {
    title: 'Website Analytics',
    data: [
      {
        "userId": "u_501",
        "eventType": "session_start",
        "properties": { "page": "/home", "referrer": "google.com" },
        "contact": {
          "email": "webuser501@example.com",
          "phone": "+1234567896",
          "pushToken": "tok_web_501"
        },
        "timestamp": 1695800600000,
        "source": "Website"
      },
      {
        "userId": "u_502",
        "eventType": "bounce",
        "properties": { "page": "/products", "time_on_page": 15 },
        "contact": {
          "email": "webuser502@example.com",
          "phone": "+1234567897",
          "pushToken": "tok_web_502"
        },
        "timestamp": 1695800700000,
        "source": "Website"
      },
      {
        "userId": "u_503",
        "eventType": "page_view",
        "properties": { "page": "/blog/post-1", "category": "Tech" },
        "contact": {
          "email": "webuser503@example.com",
          "phone": "+1234567898",
          "pushToken": "tok_web_503"
        },
        "timestamp": 1695800800000,
        "source": "Website"
      },
      {
        "userId": "u_504",
        "eventType": "form_start",
        "properties": { "form_id": "contact_form" },
        "contact": {
          "email": "webuser504@example.com",
          "phone": "+1234567899",
          "pushToken": "tok_web_504"
        },
        "timestamp": 1695800900000,
        "source": "Website"
      },
      {
        "userId": "u_505",
        "eventType": "form_complete",
        "properties": { "form_id": "checkout_form" },
        "contact": {
          "email": "webuser505@example.com",
          "phone": "+1234567800",
          "pushToken": "tok_web_505"
        },
        "timestamp": 1695801000000,
        "source": "Website"
      }
    ]
  },
  'Shopify': {
    title: 'Shopify Store Data',
    data: [
      {
        "userId": "u_101",
        "eventType": "cart_abandon",
        "properties": { "item": "Shoes", "value": 75 },
        "contact": {
          "email": "jane@example.com",
          "phone": "+8801XXXX",
          "pushToken": "tok_abc"
        },
        "timestamp": 1695800000000,
        "source": "Shopify"
      },
      {
        "userId": "u_602",
        "eventType": "purchase",
        "properties": { "item": "Watch", "value": 199.99 },
        "contact": {
          "email": "shopifyuser602@example.com",
          "phone": "+1234567899",
          "pushToken": "tok_shop_602"
        },
        "timestamp": 1695800900000,
        "source": "Shopify"
      },
      {
        "userId": "u_603",
        "eventType": "product_view",
        "properties": { "product_id": "prod_789", "category": "Electronics" },
        "contact": {
          "email": "shopifyuser603@example.com",
          "phone": "+1234567801",
          "pushToken": "tok_shop_603"
        },
        "timestamp": 1695801000000,
        "source": "Shopify"
      },
      {
        "userId": "u_604",
        "eventType": "search",
        "properties": { "query": "wireless headphones", "results_count": 12 },
        "contact": {
          "email": "shopifyuser604@example.com",
          "phone": "+1234567802",
          "pushToken": "tok_shop_604"
        },
        "timestamp": 1695801100000,
        "source": "Shopify"
      },
      {
        "userId": "u_605",
        "eventType": "wishlist_add",
        "properties": { "product_id": "prod_101", "product_name": "Smartphone" },
        "contact": {
          "email": "shopifyuser605@example.com",
          "phone": "+1234567803",
          "pushToken": "tok_shop_605"
        },
        "timestamp": 1695801200000,
        "source": "Shopify"
      }
    ]
  },
  'CRMs': {
    title: 'CRM Customer Data',
    data: [
      {
        "userId": "u_701",
        "eventType": "lead_create",
        "properties": { "source": "web_form", "interest": "Product Demo" },
        "contact": {
          "email": "crmuser701@example.com",
          "phone": "+1234567800",
          "pushToken": "tok_crm_701"
        },
        "timestamp": 1695801000000,
        "source": "CRMs"
      },
      {
        "userId": "u_702",
        "eventType": "lead_update",
        "properties": { "status": "qualified", "score": 85 },
        "contact": {
          "email": "crmuser702@example.com",
          "phone": "+1234567801",
          "pushToken": "tok_crm_702"
        },
        "timestamp": 1695801100000,
        "source": "CRMs"
      },
      {
        "userId": "u_703",
        "eventType": "deal_create",
        "properties": { "value": 5000, "stage": "proposal" },
        "contact": {
          "email": "crmuser703@example.com",
          "phone": "+1234567802",
          "pushToken": "tok_crm_703"
        },
        "timestamp": 1695801200000,
        "source": "CRMs"
      },
      {
        "userId": "u_704",
        "eventType": "deal_update",
        "properties": { "stage": "negotiation", "probability": 75 },
        "contact": {
          "email": "crmuser704@example.com",
          "phone": "+1234567803",
          "pushToken": "tok_crm_704"
        },
        "timestamp": 1695801300000,
        "source": "CRMs"
      },
      {
        "userId": "u_705",
        "eventType": "deal_close",
        "properties": { "status": "won", "value": 7500 },
        "contact": {
          "email": "crmuser705@example.com",
          "phone": "+1234567804",
          "pushToken": "tok_crm_705"
        },
        "timestamp": 1695801400000,
        "source": "CRMs"
      }
    ]
  },
  'Twitter Page': {
    title: 'Twitter Analytics',
    data: [
      {
        "userId": "u_801",
        "eventType": "tweet_engagement",
        "properties": { "action": "retweet", "tweet_id": "t_456" },
        "contact": {
          "email": "twitteruser801@example.com",
          "phone": "+1234567801",
          "pushToken": "tok_tw_801"
        },
        "timestamp": 1695801100000,
        "source": "Twitter Page"
      },
      {
        "userId": "u_802",
        "eventType": "tweet_engagement",
        "properties": { "action": "like", "tweet_id": "t_457" },
        "contact": {
          "email": "twitteruser802@example.com",
          "phone": "+1234567802",
          "pushToken": "tok_tw_802"
        },
        "timestamp": 1695801200000,
        "source": "Twitter Page"
      },
      {
        "userId": "u_803",
        "eventType": "tweet_engagement",
        "properties": { "action": "reply", "tweet_id": "t_458" },
        "contact": {
          "email": "twitteruser803@example.com",
          "phone": "+1234567803",
          "pushToken": "tok_tw_803"
        },
        "timestamp": 1695801300000,
        "source": "Twitter Page"
      },
      {
        "userId": "u_804",
        "eventType": "follow",
        "properties": { "action": "follow" },
        "contact": {
          "email": "twitteruser804@example.com",
          "phone": "+1234567804",
          "pushToken": "tok_tw_804"
        },
        "timestamp": 1695801400000,
        "source": "Twitter Page"
      },
      {
        "userId": "u_805",
        "eventType": "click",
        "properties": { "link": "https://example.com/promo", "tweet_id": "t_459" },
        "contact": {
          "email": "twitteruser805@example.com",
          "phone": "+1234567805",
          "pushToken": "tok_tw_805"
        },
        "timestamp": 1695801500000,
        "source": "Twitter Page"
      }
    ]
  },
  'Review Sites': {
    title: 'Review Site Data',
    data: [
      {
        "userId": "u_901",
        "eventType": "review_submit",
        "properties": { "rating": 5, "platform": "Trustpilot" },
        "contact": {
          "email": "reviewuser901@example.com",
          "phone": "+1234567802",
          "pushToken": "tok_rev_901"
        },
        "timestamp": 1695801200000,
        "source": "Review Sites"
      },
      {
        "userId": "u_902",
        "eventType": "review_submit",
        "properties": { "rating": 4, "platform": "Google Reviews" },
        "contact": {
          "email": "reviewuser902@example.com",
          "phone": "+1234567803",
          "pushToken": "tok_rev_902"
        },
        "timestamp": 1695801300000,
        "source": "Review Sites"
      },
      {
        "userId": "u_903",
        "eventType": "review_submit",
        "properties": { "rating": 3, "platform": "Yelp" },
        "contact": {
          "email": "reviewuser903@example.com",
          "phone": "+1234567804",
          "pushToken": "tok_rev_903"
        },
        "timestamp": 1695801400000,
        "source": "Review Sites"
      },
      {
        "userId": "u_904",
        "eventType": "review_response",
        "properties": { "response": "Thank you for your feedback!", "platform": "Trustpilot" },
        "contact": {
          "email": "reviewuser904@example.com",
          "phone": "+1234567805",
          "pushToken": "tok_rev_904"
        },
        "timestamp": 1695801500000,
        "source": "Review Sites"
      },
      {
        "userId": "u_905",
        "eventType": "review_flag",
        "properties": { "reason": "inappropriate_content", "platform": "Google Reviews" },
        "contact": {
          "email": "reviewuser905@example.com",
          "phone": "+1234567806",
          "pushToken": "tok_rev_905"
        },
        "timestamp": 1695801600000,
        "source": "Review Sites"
      }
    ]
  },
  'Ad Managers (Meta, Google, Tiktok, etc.)': {
    title: 'Ad Manager Performance',
    data: [
      {
        "userId": "u_1001",
        "eventType": "ad_click",
        "properties": { "campaign": "Summer Sale", "platform": "Meta" },
        "contact": {
          "email": "aduser1001@example.com",
          "phone": "+1234567803",
          "pushToken": "tok_ad_1001"
        },
        "timestamp": 1695801300000,
        "source": "Ad Managers"
      },
      {
        "userId": "u_1002",
        "eventType": "ad_impression",
        "properties": { "campaign": "Back to School", "platform": "Google" },
        "contact": {
          "email": "aduser1002@example.com",
          "phone": "+1234567804",
          "pushToken": "tok_ad_1002"
        },
        "timestamp": 1695801400000,
        "source": "Ad Managers"
      },
      {
        "userId": "u_1003",
        "eventType": "ad_conversion",
        "properties": { "campaign": "Holiday Special", "platform": "TikTok", "value": 45.99 },
        "contact": {
          "email": "aduser1003@example.com",
          "phone": "+1234567805",
          "pushToken": "tok_ad_1003"
        },
        "timestamp": 1695801500000,
        "source": "Ad Managers"
      },
      {
        "userId": "u_1004",
        "eventType": "ad_click",
        "properties": { "campaign": "New Product Launch", "platform": "Meta" },
        "contact": {
          "email": "aduser1004@example.com",
          "phone": "+1234567806",
          "pushToken": "tok_ad_1004"
        },
        "timestamp": 1695801600000,
        "source": "Ad Managers"
      },
      {
        "userId": "u_1005",
        "eventType": "ad_view",
        "properties": { "campaign": "Brand Awareness", "platform": "Google", "duration": "30s" },
        "contact": {
          "email": "aduser1005@example.com",
          "phone": "+1234567807",
          "pushToken": "tok_ad_1005"
        },
        "timestamp": 1695801700000,
        "source": "Ad Managers"
      }
    ]
  }
};