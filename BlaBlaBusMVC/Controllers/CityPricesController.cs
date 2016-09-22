using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web.Mvc;
using BlaBlaBusMVC.Models;

namespace BlaBlaBusMVC.Controllers
{
    public class CityPricesController : BaseController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: CityPrices
        public ActionResult Index()
        {
            return View(db.CityPrices.ToList());
        }

        // GET: CityPrices/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CityPrice cityPrice = db.CityPrices.Find(id);
            if (cityPrice == null)
            {
                return HttpNotFound();
            }
            return View(cityPrice);
        }

        // GET: CityPrices/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: CityPrices/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "Id,Price")] CityPrice cityPrice)
        {
            if (ModelState.IsValid)
            {
                db.CityPrices.Add(cityPrice);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(cityPrice);
        }

        // GET: CityPrices/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CityPrice cityPrice = db.CityPrices.Find(id);
            if (cityPrice == null)
            {
                return HttpNotFound();
            }
            return View(cityPrice);
        }

        // POST: CityPrices/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "Id,Price")] CityPrice cityPrice)
        {
            if (ModelState.IsValid)
            {
                db.Entry(cityPrice).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(cityPrice);
        }

        // GET: CityPrices/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            CityPrice cityPrice = db.CityPrices.Find(id);
            if (cityPrice == null)
            {
                return HttpNotFound();
            }
            return View(cityPrice);
        }

        // POST: CityPrices/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            CityPrice cityPrice = db.CityPrices.Find(id);
            db.CityPrices.Remove(cityPrice);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
