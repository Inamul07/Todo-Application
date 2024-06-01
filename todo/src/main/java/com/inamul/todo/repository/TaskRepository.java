package com.inamul.todo.repository;

import com.inamul.todo.model.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Integer> {
    List<Task> findByUserUserId(int userId);
}
