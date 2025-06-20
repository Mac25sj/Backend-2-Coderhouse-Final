class CookiesService {
  create(res) {
    return res
      .cookie("user_id", "ValorCookie1234", { maxAge: 7 * 24 * 60 * 60 * 1000 })
      .cookie("role", "current_admin", {
        maxAge: 12 * 24 * 60 * 60 * 1000,
        signed: true,
      });
  }

  read(req) {
    return {
      cookies: req.cookies,
      signed: req.signedCookies,
    };
  }

  clear(res) {
    return res.clearCookie("role", { signed: true }).clearCookie("user_id");
  }
}

const cookiesService = new CookiesService();
export default cookiesService;