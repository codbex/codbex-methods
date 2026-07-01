package gen.codbex_methods.data.settings;

import org.eclipse.dirigible.components.data.store.java.repository.JavaRepository;
import org.eclipse.dirigible.sdk.component.Repository;
import org.eclipse.dirigible.sdk.messaging.Producer;
import org.eclipse.dirigible.sdk.utils.Json;

@Repository
public class SentMethodRepository extends JavaRepository<SentMethodEntity> {

    public SentMethodRepository() {
        super(SentMethodEntity.class);
    }

    @Override
    public SentMethodEntity save(SentMethodEntity entity) {
        SentMethodEntity saved = super.save(entity);
        // Publish the create event so listeners (e.g. intent process triggers / reactions under gen/events) can react.
        Producer.sendToTopic("codbex-methods-Settings-SentMethod", Json.stringify(saved));
        return saved;
    }

    @Override
    public SentMethodEntity update(SentMethodEntity entity) {
        SentMethodEntity updated = super.update(entity);
        // Publish the update event (suffixed topic) so intent reactions under gen/events can react.
        Producer.sendToTopic("codbex-methods-Settings-SentMethod-updated", Json.stringify(updated));
        return updated;
    }

    /**
     * Persists changes WITHOUT publishing the "-updated" event. Intended for system-managed
     * back-references — e.g. an intent process trigger writing ProcessId back onto the entity that
     * started it. Going through {@link #update} would re-publish "SentMethod-updated" and spuriously
     * re-fire onUpdate reactions (notifications, roll-ups, integrations) for a change the user never made.
     */
    public SentMethodEntity updateWithoutEvent(SentMethodEntity entity) {
        return super.update(entity);
    }

    @Override
    public void delete(SentMethodEntity entity) {
        super.delete(entity);
        // Publish the delete event (suffixed topic) so intent reactions under gen/events can react.
        Producer.sendToTopic("codbex-methods-Settings-SentMethod-deleted", Json.stringify(entity));
    }

    @Override
    public void deleteById(Object id) {
        SentMethodEntity entity = findById(id);
        super.deleteById(id);
        if (entity != null) {
            Producer.sendToTopic("codbex-methods-Settings-SentMethod-deleted", Json.stringify(entity));
        }
    }
}
