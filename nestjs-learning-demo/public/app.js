(function () {
  "use strict";

  const state = {
    token: sessionStorage.getItem("taskflow_token") || null,
    user: JSON.parse(sessionStorage.getItem("taskflow_user") || "null"),
    projects: [],
    selectedProjectId: null,
    tasks: [],
    statusFilter: "",
  };

  // ---------- 底层请求封装：所有 API 调用都经过这里，顺带写请求日志 ----------
  async function api(method, path, body) {
    const headers = { "Content-Type": "application/json" };
    if (state.token) headers.Authorization = "Bearer " + state.token;

    const res = await fetch("/api" + path, {
      method,
      headers,
      body: body !== undefined ? JSON.stringify(body) : undefined,
    });

    logRequest(method, path, res.status);

    const isJson = (res.headers.get("content-type") || "").includes("application/json");
    const data = isJson ? await res.json().catch(() => null) : null;

    if (!res.ok) {
      const message = data && data.message
        ? (Array.isArray(data.message) ? data.message.join("\n") : data.message)
        : (res.status + " " + res.statusText);
      const err = new Error(message);
      err.status = res.status;
      throw err;
    }
    return data;
  }

  function logRequest(method, path, status) {
    const body = document.getElementById("log-body");
    const line = document.createElement("div");
    line.className = "log-line";
    line.innerHTML =
      '<span class="method">' + method + '</span>' +
      '<span class="path">' + path + '</span>' +
      '<span class="status ' + (status < 400 ? "ok2" : "bad") + '">' + status + "</span>";
    body.prepend(line);
    while (body.children.length > 20) body.removeChild(body.lastChild);
  }

  // ---------- 健康检查小灯 ----------
  async function pingHealth() {
    const dot = document.getElementById("health-dot");
    try {
      const res = await fetch("/api/health/ready");
      dot.className = "dot " + (res.ok ? "ok" : "bad");
    } catch {
      dot.className = "dot bad";
    }
  }
  pingHealth();
  setInterval(pingHealth, 15000);

  // ---------- 视图切换 ----------
  function showError(elId, message) {
    const el = document.getElementById(elId);
    el.textContent = message;
    el.style.display = "block";
  }
  function hideError(elId) {
    document.getElementById(elId).style.display = "none";
  }

  function renderAuthState() {
    const loggedIn = !!state.token;
    document.getElementById("auth-view").style.display = loggedIn ? "none" : "block";
    document.getElementById("app-view").style.display = loggedIn ? "block" : "none";
    document.getElementById("user-box").style.display = loggedIn ? "flex" : "none";
    if (loggedIn && state.user) {
      document.getElementById("user-email").textContent =
        state.user.displayName + " · " + state.user.email;
    }
  }

  function setSession(token, user) {
    state.token = token;
    state.user = user;
    sessionStorage.setItem("taskflow_token", token);
    sessionStorage.setItem("taskflow_user", JSON.stringify(user));
    renderAuthState();
    loadProjects();
  }

  document.getElementById("logout-btn").addEventListener("click", () => {
    state.token = null;
    state.user = null;
    state.selectedProjectId = null;
    sessionStorage.removeItem("taskflow_token");
    sessionStorage.removeItem("taskflow_user");
    renderAuthState();
  });

  // ---------- 登录 / 注册 表单 ----------
  document.getElementById("tab-login").addEventListener("click", () => {
    document.getElementById("tab-login").classList.add("active");
    document.getElementById("tab-register").classList.remove("active");
    document.getElementById("login-form").style.display = "block";
    document.getElementById("register-form").style.display = "none";
    hideError("auth-error");
  });
  document.getElementById("tab-register").addEventListener("click", () => {
    document.getElementById("tab-register").classList.add("active");
    document.getElementById("tab-login").classList.remove("active");
    document.getElementById("register-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    hideError("auth-error");
  });

  document.getElementById("login-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("auth-error");
    try {
      const data = await api("POST", "/auth/login", {
        email: document.getElementById("login-email").value,
        password: document.getElementById("login-password").value,
      });
      setSession(data.accessToken, data.user);
    } catch (err) {
      showError("auth-error", err.message);
    }
  });

  document.getElementById("register-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("auth-error");
    try {
      const data = await api("POST", "/auth/register", {
        email: document.getElementById("register-email").value,
        displayName: document.getElementById("register-name").value,
        password: document.getElementById("register-password").value,
      });
      setSession(data.accessToken, data.user);
    } catch (err) {
      showError("auth-error", err.message);
    }
  });

  // ---------- 项目 ----------
  async function loadProjects() {
    try {
      state.projects = await api("GET", "/projects");
      renderProjects();
    } catch (err) {
      showError("app-error", err.message);
    }
  }

  function renderProjects() {
    const list = document.getElementById("project-list");
    list.innerHTML = "";
    if (state.projects.length === 0) {
      list.innerHTML = '<div class="empty">还没有项目，先在下面创建一个</div>';
      return;
    }
    for (const p of state.projects) {
      const item = document.createElement("div");
      item.className = "project-item" + (p.id === state.selectedProjectId ? " selected" : "");
      item.innerHTML =
        '<button class="del" data-id="' + p.id + '">删除</button>' +
        '<div class="name">' + escapeHtml(p.name) + "</div>" +
        (p.description ? '<div class="desc">' + escapeHtml(p.description) + "</div>" : "");
      item.addEventListener("click", (e) => {
        if (e.target.classList.contains("del")) return;
        selectProject(p.id, p.name);
      });
      item.querySelector(".del").addEventListener("click", async (e) => {
        e.stopPropagation();
        if (!confirm('删除项目 "' + p.name + '"？其下所有任务也会一起删除。')) return;
        try {
          await api("DELETE", "/projects/" + p.id);
          if (state.selectedProjectId === p.id) {
            state.selectedProjectId = null;
            document.getElementById("tasks-body").style.display = "none";
            document.getElementById("tasks-empty-hint").style.display = "block";
            document.getElementById("tasks-title").textContent = "任务";
          }
          loadProjects();
        } catch (err) {
          showError("app-error", err.message);
        }
      });
      list.appendChild(item);
    }
  }

  document.getElementById("project-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("app-error");
    try {
      await api("POST", "/projects", {
        name: document.getElementById("project-name").value,
        description: document.getElementById("project-desc").value || undefined,
      });
      document.getElementById("project-form").reset();
      loadProjects();
    } catch (err) {
      showError("app-error", err.message);
    }
  });

  function selectProject(id, name) {
    state.selectedProjectId = id;
    document.getElementById("tasks-empty-hint").style.display = "none";
    document.getElementById("tasks-body").style.display = "block";
    document.getElementById("tasks-title").textContent = "任务 · " + name;
    renderProjects();
    loadTasks();
  }

  // ---------- 任务 ----------
  async function loadTasks() {
    if (!state.selectedProjectId) return;
    const qs = state.statusFilter ? "?status=" + state.statusFilter + "&limit=50" : "?limit=50";
    try {
      const res = await api("GET", "/projects/" + state.selectedProjectId + "/tasks" + qs);
      state.tasks = res.data;
      renderTasks();
    } catch (err) {
      showError("app-error", err.message);
    }
  }

  function renderTasks() {
    const list = document.getElementById("task-list");
    list.innerHTML = "";
    if (state.tasks.length === 0) {
      list.innerHTML = '<div class="empty">这个项目下还没有符合条件的任务</div>';
      return;
    }
    for (const t of state.tasks) {
      const item = document.createElement("div");
      item.className = "task-item";
      item.innerHTML =
        '<span class="title' + (t.status === "done" ? " done" : "") + '">' + escapeHtml(t.title) + "</span>" +
        '<span class="badge ' + t.priority + '">' + priorityLabel(t.priority) + "</span>" +
        '<select data-id="' + t.id + '">' +
          '<option value="todo"' + (t.status === "todo" ? " selected" : "") + ">待办</option>" +
          '<option value="in_progress"' + (t.status === "in_progress" ? " selected" : "") + ">进行中</option>" +
          '<option value="done"' + (t.status === "done" ? " selected" : "") + ">已完成</option>" +
        "</select>" +
        '<button class="del" data-id="' + t.id + '">✕</button>';

      item.querySelector("select").addEventListener("change", async (e) => {
        try {
          await api("PATCH", "/projects/" + state.selectedProjectId + "/tasks/" + t.id, {
            status: e.target.value,
          });
          loadTasks();
        } catch (err) {
          showError("app-error", err.message);
        }
      });
      item.querySelector(".del").addEventListener("click", async () => {
        try {
          await api("DELETE", "/projects/" + state.selectedProjectId + "/tasks/" + t.id);
          loadTasks();
        } catch (err) {
          showError("app-error", err.message);
        }
      });
      list.appendChild(item);
    }
  }

  function priorityLabel(p) {
    return p === "high" ? "高" : p === "low" ? "低" : "中";
  }

  document.getElementById("status-filter").addEventListener("click", (e) => {
    if (e.target.tagName !== "BUTTON") return;
    document.querySelectorAll("#status-filter button").forEach((b) => b.classList.remove("active"));
    e.target.classList.add("active");
    state.statusFilter = e.target.dataset.status;
    loadTasks();
  });

  document.getElementById("task-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    hideError("app-error");
    if (!state.selectedProjectId) return;
    try {
      await api("POST", "/projects/" + state.selectedProjectId + "/tasks", {
        title: document.getElementById("task-title").value,
        description: document.getElementById("task-desc").value || undefined,
        priority: document.getElementById("task-priority").value,
      });
      document.getElementById("task-form").reset();
      loadTasks();
    } catch (err) {
      showError("app-error", err.message);
    }
  });

  function escapeHtml(str) {
    const div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  // ---------- 启动 ----------
  renderAuthState();
  if (state.token) loadProjects();
})();
