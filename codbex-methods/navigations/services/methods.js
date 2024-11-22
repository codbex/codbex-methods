const navigationData = {
    id: 'methods-navigation',
    label: "Payment Methods",
    view: "methods",
    group: "configurations",
    orderNumber: 1000,
    lazyLoad: true,
    link: "/services/web/codbex-methods/gen/codbex-methods/ui/Methods/index.html?embedded"
};

function getNavigation() {
    return navigationData;
}

if (typeof exports !== 'undefined') {
    exports.getNavigation = getNavigation;
}

export { getNavigation }
