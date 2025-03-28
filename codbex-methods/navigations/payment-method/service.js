const navigationData = {
    id: 'payment-method-navigation',
    label: "Payment Methods",
    group: "reference data",
    order: 2500,
    link: "/services/web/codbex-methods/gen/codbex-methods/ui/PaymentMethod/index.html?embedded"
};

function getNavigation() {
    return navigationData;
}

if (typeof exports !== 'undefined') {
    exports.getNavigation = getNavigation;
}

export { getNavigation }