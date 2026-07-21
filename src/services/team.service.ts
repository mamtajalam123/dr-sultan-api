import { TeamRepository } from "../repositories/team.repository";
import { Team } from "../types/team";

export class TeamService {
  private repository = new TeamRepository();

  // ==========================================
  // CREATE TEAM MEMBER
  // ==========================================
  async createTeam(team: Team) {
    return this.repository.create(team);
  }

  // ==========================================
  // GET ALL TEAM MEMBERS
  // ==========================================
  async getTeams() {
    return this.repository.findAll();
  }

  // ==========================================
  // GET TEAM MEMBER BY ID
  // ==========================================
  async getTeamById(id: number) {
    return this.repository.findById(id);
  }

  // ==========================================
  // UPDATE TEAM MEMBER
  // ==========================================
  async updateTeam(
    id: number,
    team: Team
  ) {
    return this.repository.update(
      id,
      team
    );
  }

  // ==========================================
  // DELETE TEAM MEMBER
  // ==========================================
  async deleteTeam(id: number) {
    return this.repository.delete(id);
  }
}