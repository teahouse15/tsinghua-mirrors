package top.myjinji.repository;

import org.b3log.latke.repository.*;
import org.b3log.latke.repository.annotation.Repository;
import org.json.JSONObject;

import java.util.List;

/**
 * User repository.
 *
 * @author <a href="http://88250.b3log.org">Liang Ding</a>
 * @version 1.0.0.3, Mar 8, 2019
 */
@Repository
public class WorkRepository extends AbstractRepository {

    public WorkRepository() {
        super("record");
    }

    public List<JSONObject> getData(long timestamp) throws RepositoryException {
        return getList(new Query().setFilter(new PropertyFilter("date", FilterOperator.GREATER_THAN, timestamp)));
    }


}
