package gen.codbex_methods.data.settings;

import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;
import org.eclipse.dirigible.sdk.component.Repository;

@Repository
public class PaymentMethodRepository extends JavaRepository<PaymentMethodEntity> {

    public PaymentMethodRepository() {
        super(PaymentMethodEntity.class);
    }
}
