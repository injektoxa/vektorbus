using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;
using BlaBlaBusMVC.Models;
using BlaBlaBusMVC.ViewModels;

namespace BlaBlaBusMVC.Controllers
{
    //[Authorize(Roles = "Admin")]
    public class AgentsController : BaseApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Agents
        public IEnumerable<AgentViewModel> GetAgents()
        {
            var agents = db.Agents.ToList();
            var models = agents.Select(x => new AgentViewModel(x)).ToList();
            return models;
        }

        // GET: api/Agents/5
        [ResponseType(typeof(Agent))]
        public IHttpActionResult GetAgent(int id)
        {
            Agent agent = db.Agents.Find(id);
            if (agent == null)
            {
                return NotFound();
            }

            return Ok(new AgentViewModel(agent));
        }

        // PUT: api/Agents/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutAgent(int id, Agent agent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != agent.Id)
            {
                return BadRequest();
            }

            db.Entry(agent).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AgentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Agents
        [ResponseType(typeof(Agent))]
        public IHttpActionResult PostAgent(Agent agent)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Agents.Add(agent);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = agent.Id }, agent);
        }

        // DELETE: api/Agents/5
        [ResponseType(typeof(Agent))]
        public IHttpActionResult DeleteAgent(int id)
        {
            Agent agent = db.Agents.Find(id);
            if (agent == null)
            {
                return NotFound();
            }

            if(agent.ClientTrips.Any())
            {
                return BadRequest("Клиент не может быть удален, т.к. у него есть маршрут.");
            }

            db.Agents.Remove(agent);
            db.SaveChanges();

            return Ok(agent);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool AgentExists(int id)
        {
            return db.Agents.Count(e => e.Id == id) > 0;
        }
    }
}