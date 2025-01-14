package com.itcodai.onlineshopping.util;


import lombok.Data;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

@Component
@Data
public class R {
    public Integer code;
    public Object data;
    public String msg;

    public R ok(Integer code, Object data, String msg) {
        this.code = code;
        this.data = data;
        this.msg = msg;
        return this;
    }

    public R ok(Integer code,String msg) {
        this.code = code;
        this.msg = msg;
        return this;
    }

    public static R ok(Object data)
    {
        return new R().ok(200, data, "success");
    }

    public static R error( String msg){
        return new R().ok(500, msg);
    }

    public static R unauthorized(){
            return new R().ok(401, "unauthorized");
    }

}
