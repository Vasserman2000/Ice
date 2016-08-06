using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Services;

/// <summary>
/// Summary description for IceWS
/// </summary>
[WebService(Namespace = "http://tempuri.org/")]
[WebServiceBinding(ConformsTo = WsiProfiles.BasicProfile1_1)]
// To allow this Web Service to be called from script, using ASP.NET AJAX, uncomment the following line. 
[System.Web.Script.Services.ScriptService]
public class IceWS : System.Web.Services.WebService
{
    private static string conStr = ConfigurationManager.ConnectionStrings["IceDB"].ConnectionString;
    public IceWS()
    {
        //Uncomment the following line if using designed components 
        //InitializeComponent(); 
    }

    //[WebMethod]
    //public string[] CurrentDateAndTime()
    //{
    //    string[] time = new string[2];
    //    time[0] = DateTime.Now.ToShortTimeString();
    //    time[1] = DateTime.Now.ToShortDateString();
    //    return time;
    //}
    [WebMethod]
    public string GetYepBranches()
    {
        string sp = "sp_getBranches";
        return ConvertDataTabletoString(getTable(sp));
    }

    [WebMethod]
    public string GetProducts()
    {
        string sp = "sp_getProducts";
        return ConvertDataTabletoString(getTable(sp));
    }

    [WebMethod]
    public int addFlavor(string Flavor)
    {
        int rows = 0;
        string sp = "sp_addFlavor";
        SqlConnection con = new SqlConnection(conStr);
        SqlCommand com = new SqlCommand(sp, con);
        com.CommandType = CommandType.StoredProcedure;
        com.Parameters.AddWithValue("@Flavor", Flavor);
        com.Connection.Open();
        rows = com.ExecuteNonQuery();
        return rows;
    }

    [WebMethod]
    public string GetFlavors()
    {
        string sp = "sp_getFlavors";
        return ConvertDataTabletoString(getTable(sp));
    }


    private DataTable getTable(string command)
    {
        DataTable dt = new DataTable();
        using (SqlConnection con = new SqlConnection(conStr))
        {
            using (SqlCommand cmd = new SqlCommand(command, con))
            {
                cmd.CommandType = CommandType.StoredProcedure;
                con.Open();
                SqlDataAdapter da = new SqlDataAdapter(cmd);
                da.Fill(dt);
            }
        }
        return dt;
    }


    private string ConvertDataTabletoString(DataTable dt)
    {
        System.Web.Script.Serialization.JavaScriptSerializer serializer = new System.Web.Script.Serialization.JavaScriptSerializer();
        List<Dictionary<string, object>> rows = new List<Dictionary<string, object>>();
        Dictionary<string, object> row;
        foreach (DataRow dr in dt.Rows)
        {
            row = new Dictionary<string, object>();
            foreach (DataColumn col in dt.Columns)
            {
                row.Add(col.ColumnName, dr[col]);
            }
            rows.Add(row);
        }
        return serializer.Serialize(rows);
    }
}




