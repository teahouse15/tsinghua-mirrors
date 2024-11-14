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
public class MainProcessor {

    @Inject
    private WorkService workService;

    private static final Logger LOGGER = LogManager.getLogger(MainProcessor.class);

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

}
