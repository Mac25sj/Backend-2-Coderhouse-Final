class SessionsService {
  createSession(session, payload) {
    session.role = payload.role;
    session.user_id = payload.user_id;
    return session;
  }

  readSession(session) {
    return session;
  }

  destroySession(session) {
    session.destroy();
  }
}

const sessionsService = new SessionsService();
export default sessionsService;