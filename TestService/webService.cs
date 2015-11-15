using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace TestService
{
    public class WebService
    {
        public string GetNewToken()
        {
            //чтение login и pass
            string strLogin, strPass;
            strLogin = System.Configuration.ConfigurationManager.AppSettings["Login"];
            strPass = System.Configuration.ConfigurationManager.AppSettings["Pass"];
            //авторизация, получение токена.
            //https://github.com/enableiot/iotkit-api/wiki/Authorization
            //структура JSON
            var obj = new
            {
                username = strLogin,
                password = strPass
            };
            string postData = JsonConvert.SerializeObject(obj, Formatting.Indented);
            //HttpWebRequest
            HttpWebRequest httpWebRequest = (HttpWebRequest)HttpWebRequest.Create("https://dashboard.us.enableiot.com/v1/api/auth/token");
            httpWebRequest.Method = "POST";
            httpWebRequest.ContentType = "application/json";
            //
            byte[] byte1 = System.Text.Encoding.UTF8.GetBytes(postData);
            httpWebRequest.ContentLength = byte1.Length;
            httpWebRequest.GetRequestStream().Write(byte1, 0, byte1.Length);
            httpWebRequest.GetRequestStream().Close();
            //
            StreamReader reader = new StreamReader(httpWebRequest.GetResponse().GetResponseStream());
            JObject objResponse = JObject.Parse(reader.ReadToEnd());
            return (string)objResponse["token"];
        }

        public void GetStateSensors(string strToken, Dictionary<string, string> dicSensors)
        {
            //чтение данных
            //https://github.com/enableiot/iotkit-api/wiki/Data-API
            //структура JSON
            var obj = new
            {
                from = -20,
                targetFilter = new { deviceList = new[] { "62-e3-71-4f-9a-66" } },
                metrics = new[] { new {
                        id="5786ecb0-e4f0-4934-9cd3-0852196ba89b",
                        op="none"
                    }
                }
            };
            string postData = JsonConvert.SerializeObject(obj, Formatting.Indented);
            //HttpWebRequest
            HttpWebRequest httpWebRequest = (HttpWebRequest)HttpWebRequest.Create("https://dashboard.us.enableiot.com/v1/api/accounts/4c8c6b2e-c54f-4df5-8bbb-a5e59df85aaa/data/search");
            httpWebRequest.Method = "POST";
            httpWebRequest.ContentType = "application/json";
            //Headers
            httpWebRequest.Headers.Add("Authorization", "Bearer " + strToken);
            httpWebRequest.Headers.Add("accountId", "9bd5c019-cbf5-4934-8d30-d820477c01b6");
            //
            byte[] byte1 = System.Text.Encoding.UTF8.GetBytes(postData);
            httpWebRequest.ContentLength = byte1.Length;
            httpWebRequest.GetRequestStream().Write(byte1, 0, byte1.Length);
            httpWebRequest.GetRequestStream().Close();
            //
            StreamReader reader = new StreamReader(httpWebRequest.GetResponse().GetResponseStream());
            JObject objResponse = JObject.Parse(reader.ReadToEnd());
            //add Dic
            string strValueSensor = (string)objResponse["series"][0]["points"][0]["value"];
            dicSensors.Add("pressure", strValueSensor);
            strValueSensor = (string)objResponse["series"][1]["points"][0]["value"];
            //strValueSensor = Math.Round(decimal.Parse(strValueSensor, System.Globalization.CultureInfo.CreateSpecificCulture("en")), 2).ToString();
            dicSensors.Add("temperature", strValueSensor);
        }

    }
}