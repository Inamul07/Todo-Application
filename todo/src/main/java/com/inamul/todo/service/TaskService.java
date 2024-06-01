package com.inamul.todo.service;

import com.inamul.todo.model.Task;
import com.inamul.todo.repository.TaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TaskService {

    @Autowired
    private TaskRepository taskRepository;

    public List<Task> getAll() {
        return taskRepository.findAll();
    }

    public Task getTask(int taskId) {
        Optional<Task> task = taskRepository.findById(taskId);
        return task.orElse(null);
    }

    public void saveTask(Task task) {
        taskRepository.save(task);
    }

    public List<Task> getTasksWithUserId(int userId) {
        return taskRepository.findByUserUserId(userId);
    }

    public void deleteTask(int taskId) {
        taskRepository.deleteById(taskId);
    }

}
