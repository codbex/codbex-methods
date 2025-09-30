angular.module('page', ['blimpKit', 'platformView', 'platformLocale', 'EntityService'])
	.config(['EntityServiceProvider', (EntityServiceProvider) => {
		EntityServiceProvider.baseUrl = '/services/ts/codbex-methods/gen/codbex-methods/api/Settings/PaymentMethodService.ts';
	}])
	.controller('PageController', ($scope, $http, ViewParameters, LocaleService, EntityService) => {
		const Dialogs = new DialogHub();
		const Notifications = new NotificationHub();
		let description = 'Description';
		let propertySuccessfullyCreated = 'PaymentMethod successfully created';
		let propertySuccessfullyUpdated = 'PaymentMethod successfully updated';

		$scope.entity = {};
		$scope.forms = {
			details: {},
		};
		$scope.formHeaders = {
			select: 'PaymentMethod Details',
			create: 'Create PaymentMethod',
			update: 'Update PaymentMethod'
		};
		$scope.action = 'select';

		LocaleService.onInit(() => {
			description = LocaleService.t('codbex-methods:codbex-methods-model.defaults.description');
			$scope.formHeaders.select = LocaleService.t('codbex-methods:codbex-methods-model.defaults.formHeadSelect', { name: '$t(codbex-methods:codbex-methods-model.t.PAYMENTMETHOD)' });
			$scope.formHeaders.create = LocaleService.t('codbex-methods:codbex-methods-model.defaults.formHeadCreate', { name: '$t(codbex-methods:codbex-methods-model.t.PAYMENTMETHOD)' });
			$scope.formHeaders.update = LocaleService.t('codbex-methods:codbex-methods-model.defaults.formHeadUpdate', { name: '$t(codbex-methods:codbex-methods-model.t.PAYMENTMETHOD)' });
			propertySuccessfullyCreated = LocaleService.t('codbex-methods:codbex-methods-model.messages.propertySuccessfullyCreated', { name: '$t(codbex-methods:codbex-methods-model.t.PAYMENTMETHOD)' });
			propertySuccessfullyUpdated = LocaleService.t('codbex-methods:codbex-methods-model.messages.propertySuccessfullyUpdated', { name: '$t(codbex-methods:codbex-methods-model.t.PAYMENTMETHOD)' });
		});

		let params = ViewParameters.get();
		if (Object.keys(params).length) {
			$scope.action = params.action;
			$scope.entity = params.entity;
			$scope.selectedMainEntityKey = params.selectedMainEntityKey;
			$scope.selectedMainEntityId = params.selectedMainEntityId;
		}

		$scope.create = () => {
			let entity = $scope.entity;
			entity[$scope.selectedMainEntityKey] = $scope.selectedMainEntityId;
			EntityService.create(entity).then((response) => {
				Dialogs.postMessage({ topic: 'codbex-methods.Settings.PaymentMethod.entityCreated', data: response.data });
				Notifications.show({
					title: LocaleService.t('codbex-methods:codbex-methods-model.t.PAYMENTMETHOD'),
					description: propertySuccessfullyCreated,
					type: 'positive'
				});
				$scope.cancel();
			}, (error) => {
				const message = error.data ? error.data.message : '';
				$scope.$evalAsync(() => {
					$scope.errorMessage = LocaleService.t('codbex-methods:codbex-methods-model.messages.error.unableToCreate', { name: '$t(codbex-methods:codbex-methods-model.t.PAYMENTMETHOD)', message: message });
				});
				console.error('EntityService:', error);
			});
		};

		$scope.update = () => {
			let id = $scope.entity.Id;
			let entity = $scope.entity;
			entity[$scope.selectedMainEntityKey] = $scope.selectedMainEntityId;
			EntityService.update(id, entity).then((response) => {
				Dialogs.postMessage({ topic: 'codbex-methods.Settings.PaymentMethod.entityUpdated', data: response.data });
				Notifications.show({
					title: LocaleService.t('codbex-methods:codbex-methods-model.t.PAYMENTMETHOD'),
					description: propertySuccessfullyUpdated,
					type: 'positive'
				});
				$scope.cancel();
			}, (error) => {
				const message = error.data ? error.data.message : '';
				$scope.$evalAsync(() => {
					$scope.errorMessage = LocaleService.t('codbex-methods:codbex-methods-model.messages.error.unableToUpdate', { name: '$t(codbex-methods:codbex-methods-model.t.PAYMENTMETHOD)', message: message });
				});
				console.error('EntityService:', error);
			});
		};


		$scope.alert = (message) => {
			if (message) Dialogs.showAlert({
				title: description,
				message: message,
				type: AlertTypes.Information,
				preformatted: true,
			});
		};

		$scope.cancel = () => {
			$scope.entity = {};
			$scope.action = 'select';
			Dialogs.closeWindow({ id: 'PaymentMethod-details' });
		};

		$scope.clearErrorMessage = () => {
			$scope.errorMessage = null;
		};
	});