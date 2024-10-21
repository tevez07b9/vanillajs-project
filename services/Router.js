const Router = {
  init: () => {
    document.querySelectorAll("a.navlink").forEach((a) => {
      a.addEventListener("click", (event) => {
        event.preventDefault();
        const href = event.target.getAttribute("href");
        Router.go(href);
      });
    });

    // Process initial URL
    Router.go(location.pathname);

    window.addEventListener("popstate", (event) => {
      Router.go(event.state.route, false);
    });
  },
  go: (route, addToHistory = true) => {
    if (addToHistory) {
      history.pushState({ route }, null, route);
    }

    let pageElement;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        pageElement.textContent = "Order";
        break;

      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("detail-page");
          pageElement.dataset.productId = route.substring(
            route.lastIndexOf("-") + 1
          );
        }
        break;
    }

    if (pageElement) {
      const mainElement = document.querySelector("main");
      mainElement.innerHTML = "";
      mainElement.appendChild(pageElement);
    }

    window.scrollX = 0;
    window.scrollY = 0;
  },
};

export default Router;
