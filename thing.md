---

# 🛠️ Hexagon Project Setup

## ⚙️ Development Environment

To set up your development environment:

* Duplicate the `.env.example` file and rename it to `.env` if it does not already exist.

* **Important:** If you do not have the Arbiter component configured, set the following in your `.env` file:

  ```
  DISABLE_RENDER=true
  ```

* Failure to do so may result in runtime errors.

To simplify the development workflow, a Docker container has been prepared. Use the following commands to build and start the development environment:

```
docker compose -f compose_dev.yml build
docker compose -f compose_dev.yml up
```

## 🚀 Production Environment

A separate Docker container is also available for production use.

* **Note:** You must also set up the `hexagon-maintenance` project and build it. This is required for Caddy to correctly serve custom error pages.

To build and run the production environment:

```
docker compose build
docker compose up -d
```

If you have any questions, feel free to reach out.
Happy coding! :3

---
