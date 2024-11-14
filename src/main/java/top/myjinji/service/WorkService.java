package top.myjinji.service;

import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.b3log.latke.ioc.Inject;
import org.b3log.latke.repository.RepositoryException;
import org.b3log.latke.repository.annotation.Transactional;
import org.b3log.latke.service.annotation.Service;
import org.json.JSONObject;
import top.myjinji.repository.WorkRepository;

import java.util.List;

/**
 * User service.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.0.0.3, Feb 10, 2020
 * @since 2.0.0
 */
@Service
public class WorkService {

    private static final Logger LOGGER = LogManager.getLogger(WorkService.class);

    @Inject
    private WorkRepository workRepository;

    @Transactional
    public void updateData(String oId, JSONObject data) {
        try {
            workRepository.update(oId, data);
        } catch (RepositoryException e) {
            throw new RuntimeException(e);
        }
    }

    @Transactional
    public void deleteData(String oId) {
        try {
            workRepository.remove(oId);
        } catch (RepositoryException e) {
            throw new RuntimeException(e);
        }
    }


    @Transactional
    public List<JSONObject> getData(long timestamp) {
        List<JSONObject> data;
        try {
            data = workRepository.getData(timestamp);

        } catch (RepositoryException e) {
            throw new RuntimeException(e);
        }
        return data;
    }


    @Transactional
    public void putData(final JSONObject data) {
        String date = String.valueOf(System.currentTimeMillis());
        data.put("date", date);
        String oId;

        try {
            oId = workRepository.add(data);
        } catch (final RepositoryException e) {
            LOGGER.log(Level.ERROR, "Saves user failed", e);

            // 抛出异常后框架将回滚事务
            throw new IllegalStateException("Saves user failed");
        }

        LOGGER.log(Level.INFO, "Saves a user successfully [userId={}]", oId);
    }
}
