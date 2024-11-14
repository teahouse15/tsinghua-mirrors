package top.myjinji.processor;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.b3log.latke.http.Dispatcher;
import org.b3log.latke.http.RequestContext;
import org.b3log.latke.ioc.BeanManager;
import org.b3log.latke.ioc.Inject;
import org.b3log.latke.ioc.Singleton;
import org.b3log.latke.util.Requests;
import org.json.JSONObject;
import top.myjinji.service.WorkService;

import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Collections;
import java.util.List;
import java.util.Map;

/**
 * Hello.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 2.0.0.0, Feb 10, 2020
 * @since 2.0.0
 */
@Singleton
public class IndexProcessor {

    @Inject
    private WorkService workService;

    private static final Logger LOGGER = LogManager.getLogger(IndexProcessor.class);


    public static void register() {
        final BeanManager beanManager = BeanManager.getInstance();
        final IndexProcessor indexProcessor = beanManager.getReference(IndexProcessor.class);
        Dispatcher.get("/", indexProcessor::index);
        Dispatcher.get("/l", indexProcessor::index_list);
        Dispatcher.post("/put", indexProcessor::putData);
        Dispatcher.get("/list", indexProcessor::getData);
        Dispatcher.post("/delete", indexProcessor::deleteData);
        Dispatcher.post("/update", indexProcessor::updateData);
    }

    public void updateData(final RequestContext context) {
        JSONObject data = context.getRequest().getJSON();
        String oId = data.optString("oId");

        workService.updateData(oId, data);
        context.renderJSON(new JSONObject().put("code", "1"));
    }

    public void deleteData(final RequestContext context) {
        JSONObject data = context.getRequest().getJSON();
        String oId = data.optString("oId");
        workService.deleteData(oId);
        context.renderJSON(new JSONObject().put("code", "1"));
    }

    public void putData(final RequestContext context) {
        JSONObject data = context.getRequest().getJSON();
        System.out.println("增加：" + data.toString());
        workService.putData(data);

        context.renderJSON(new JSONObject().put("code", "1").put("msg", "success").put("data", data));
    }

    public void getData(final RequestContext context) {
        long timestamp = LocalDate.now()
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();

        List<JSONObject> data = workService.getData(timestamp);
        Collections.reverse(data);
        context.renderJSON(new JSONObject().put("code", "1").put("msg", "success").put("data", (data)));
    }

    public void index(final RequestContext context) {
        long timestamp = LocalDate.now()
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();

        int orderCount = workService.getData(timestamp).size();

        context.setRenderer(new SimpleFMRenderer("index.ftl"));

        final Map<String, Object> dataModel = context.getRenderer().getRenderDataModel();
        dataModel.put("orderCount", orderCount);

        Requests.log(context.getRequest(), Level.DEBUG, LOGGER);
    }

    public void index_list(final RequestContext context) {
        long timestamp = LocalDate.now()
                .atStartOfDay(ZoneId.systemDefault())
                .toInstant()
                .toEpochMilli();

        int orderCount = workService.getData(timestamp).size();
        context.setRenderer(new SimpleFMRenderer("list.ftl"));

        final Map<String, Object> dataModel = context.getRenderer().getRenderDataModel();
        dataModel.put("", "");
        dataModel.put("orderCount", orderCount);

        Requests.log(context.getRequest(), Level.DEBUG, LOGGER);
    }
}
