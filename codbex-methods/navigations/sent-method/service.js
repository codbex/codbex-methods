const navigationData = {
    id: 'methods-navigation',
    label: "Sent Methods",
    group: "reference data",
    order: 2700,
    link: "/services/web/codbex-methods/gen/codbex-methods/ui/SentMethod/index.html?embedded"
};

function getNavigation() {
    return navigationData;
}

if (typeof exports !== 'undefined') {
    exports.getNavigation = getNavigation;
}

export { getNavigation }