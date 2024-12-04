const navigationData = {
    id: 'methods-navigation',
    label: "Payment Methods",
    group: "metadata",
    order: 2400,
    link: "/services/web/codbex-methods/gen/codbex-methods/ui/Methods/index.html?embedded"
};

function getNavigation() {
    return navigationData;
}

if (typeof exports !== 'undefined') {
    exports.getNavigation = getNavigation;
}

export { getNavigation }